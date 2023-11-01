import { Button, Card, FloatButton, Input, Layout, List, Popconfirm, Radio } from 'antd'
import { useEffect, useState } from 'react'
import QuizService from '../service/Quiz.service'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuestionTypes, QuestionType } from '../constants/QuestionType'
import { DeleteOutlined, EditOutlined, FileOutlined, PlusOutlined } from '@ant-design/icons'
import { Controller, useForm } from 'react-hook-form'
import QuestionService from '../service/Question.service'
import AuthService from '../service/Auth.service'

const Quiz = () => {

  const token = localStorage.getItem('token');

  const [questions, setQuestions] = useState([])
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(false)

  const params = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: {isValid}, reset } = useForm({mode: 'onChange'})

  useEffect(() => {
    if (params.id) {
      setAdding(false)
      fetchQuestions()
    }
    validateToken(token)
  }, [params.id])

  const fetchQuestions = () => {
    QuizService.getQuestions(params.id, token).then(response => {
      setQuestions(response.data);
    })
  }

  const validateToken = async (token) => {
    try {
      const response = await AuthService.validateToken(token);
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const getItem = (item) => {
    if (item?.adding || item?.editing) {
      return <Card title={
        <Controller
          control={control}
          name={'questionText'}
          defaultValue={item?.editing ? item.questionText : ''}
          rules={{ minLength: { value: 3 }, maxLength: { value: 50 }, required: { value: true } }}
          render={({ field: { value, onChange } }) =>
            <Input placeholder="Question text" value={value} onChange={onChange}/>}
        />
      }>
        <Controller
          control={control}
          name={'questionType'}
          rules={{ required: { value: true } }}
          defaultValue={item?.editing ? item.questionType : QuestionType.Single}
          render={({ field: { value, onChange } }) =>
            <Radio.Group optionType="button"
                         buttonStyle="solid"
                         style={{ paddingBottom: 30 }}
                         options={getQuestionTypes}
                         onChange={onChange}
                         value={value}/>}
        />

        <Layout style={{ paddingTop: 20, flexDirection: 'row', gap: 20 }}>
          <Button disabled={!isValid}
                  onClick={handleSubmit(data => item?.editing ? handleEditQuiz(data, item) : handleAddQuestion(data))}>
            {item?.editing ? 'Edit' : 'Add'}
          </Button>
          <Button onClick={cancelEditing}>Cancel</Button>
        </Layout>
      </Card>
    }

    return <List.Item aria-disabled={editing && !item?.editing}>
      <Card title={item.questionText}
            actions={[
              <Button icon={<FileOutlined/>} onClick={() => navigate(`/questions/${item.ID}`)}/>,
              <Button icon={<EditOutlined/>} onClick={() => handleEdit(item)}/>,
              <Popconfirm
                okButtonProps={{danger: true}}
                overlayInnerStyle={{backgroundColor: '#001664'}}
                title="Are you sure?"
                okText="Yes"
                onConfirm={() => handleDeleteQuestion(item.ID)}
                cancelText="No">
                <Button icon={<DeleteOutlined/>}/>
              </Popconfirm>
            ]}>
        {getQuestionType(item)}
      </Card>
    </List.Item>
  }
  const handleEdit = (item) => {
    setEditing(true)
    setAdding(true)
    reset()
    setQuestions(values => {
      const result = [...values];
      const index = values.indexOf(item);
      result[index] = {...item, editing: true}
      return result;
    })
  }

  const cancelEditing = () => {
    setAdding(false)
    setEditing(false)
    fetchQuestions()
  }

  const getQuestionType = (q) => {
    if (QuestionType.isSingle(q.questionType)) {
      return 'Single';
    }
    if (QuestionType.isMultiple(q.questionType)) {
      return 'Multiple';
    }
    return '';
  }

  const handleAdd = () => {
    setAdding(true);
    setEditing(true)
    reset()
    setQuestions(values => ([...values, { adding: true }]))
  }

  const handleAddQuestion = (values) => {
    QuestionService.post({...values, quizId: +params?.id}, token).then(() => {
      setAdding(false)
      setEditing(false)
      fetchQuestions();
    })
  }

  const handleEditQuiz = (values, item) => {
    QuestionService.put(item.ID, {...item, ...values}, token).then(() => {
      setAdding(false)
      setEditing(false)
      fetchQuestions();
    })
  }

const handleDeleteQuestion = (id) => {
  QuestionService.delete(id, token).then(fetchQuestions)
}

return <Layout style={{paddingLeft: 30, paddingRight: 30, gap: 30}}>
  {!adding && <FloatButton icon={<PlusOutlined style={{ color: '#000' }}/>}
                           onClick={handleAdd}
                           type="default"
                           shape={'square'}/>}

  <List
    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
    dataSource={questions}
    renderItem={getItem}
  />
</Layout>

}

export default Quiz;
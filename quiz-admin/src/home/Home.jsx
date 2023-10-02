import { Button, Card, FloatButton, Input, Layout, List, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import QuizService from '../service/Quiz.service'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, FileOutlined, PlusOutlined } from '@ant-design/icons'
import { Controller, useForm } from 'react-hook-form'

const Home = () => {

  const [quizzes, setQuizzes] = useState([])
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(false)
  const { control, handleSubmit, formState: {isValid}, reset } = useForm({mode: 'onChange'})

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = () => {
    QuizService.getAll().then(response => {
      setQuizzes(response.data);
    })
  }

  const getItem = (item) => {
    if (item?.adding || item?.editing) {
      return <Card
        title={<Controller
          control={control}
          name={'title'}
          defaultValue={item?.editing? item.title: ''}
          rules={{ minLength: { value: 3 }, maxLength: { value: 50 }, required: {value: true}}}
          render={({ field: { value, onChange } }) =>
            <Input placeholder="Title" value={value} onChange={onChange} />}
        />
      }>
        <Controller
          control={control}
          name={'description'}
          defaultValue={item?.editing? item.description: ''}
          rules={{ minLength: { value: 3 }, maxLength: { value: 50 }, required: {value: true}}}
          render={({ field: { value, onChange } }) =>
            <Input.TextArea placeholder="Description" value={value} onChange={onChange} />}
        />

        <Layout style={{paddingTop: 20, flexDirection: 'row', gap: 20}}>
          <Button disabled={!isValid}
                  onClick={handleSubmit(data => item?.editing?handleEditQuiz(data, item): handleAddQuiz(data))}>
            {item?.editing? 'Edit': 'Add'}
          </Button>
          <Button onClick={cancelEditing}>Cancel</Button>
        </Layout>
      </Card>
    }
    return <List.Item aria-disabled={editing && !item?.editing}>
      <Card title={item.title}
            actions={[
              <Button icon={<FileOutlined/>} onClick={() => navigate(`/quizzes/${item.ID}`)}/>,
              <Button icon={<EditOutlined/>} onClick={() => handleEdit(item)}/>,
              <Popconfirm
                okButtonProps={{danger: true}}
                overlayInnerStyle={{backgroundColor: '#001664'}}
                title="Are you sure?"
                okText="Yes"
                onConfirm={() => handleDeleteQuiz(item.ID)}
                cancelText="No">
                <Button icon={<DeleteOutlined/>}/>
              </Popconfirm>
            ]}>
        {item.description}
      </Card>
    </List.Item>
  }

  const handleAddQuiz = (values) => {
    QuizService.post(values).then(() => {
      setAdding(false);
      setEditing(false);
      fetchQuizzes()
    })
  }
  const handleEditQuiz = (values, item) => {
    QuizService.put(item.ID, { ...item,...values }).then(() => {
      setAdding(false);
      setEditing(false);
      fetchQuizzes()
    })
  }
  const handleAdd = () => {
    setEditing(true)
    setAdding(true);
    reset()
    setQuizzes(values => ([...values, { adding: true }]))
  }
  const cancelEditing = () => {
    setAdding(false)
    setEditing(false)
    fetchQuizzes()
  }

  const handleEdit = (item) => {
    setEditing(true)
    setAdding(true)
    reset()
    setQuizzes(values => {
      const result = [...values];
      const index = values.indexOf(item);
      result[index] = {...item, editing: true}
      return result;
    })
  }

  const handleDeleteQuiz = (id) => {
    QuizService.delete(id).then(fetchQuizzes)
  }

  return <Layout>
    {!adding && <FloatButton icon={<PlusOutlined style={{ color: '#000' }}/>}
                             onClick={handleAdd}
                             type="default"
                             shape={'square'}/>}

    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
      dataSource={quizzes}
      renderItem={getItem}
    />
  </Layout>

}

export default Home;
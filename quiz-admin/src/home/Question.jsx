import { Button, FloatButton, Input, Layout, Popconfirm, Switch, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuestionService from '../service/Question.service'
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Controller, useForm } from 'react-hook-form'
import OptionService from '../service/Option.service'

const Question = () => {

  const columns = [
    {
      title: 'Option text',
      render: (_, item) => {
        if (item?.adding || item?.editing) {
          return <div>
            <Controller
              control={control}
              defaultValue={item?.editing? item?.optionText: ''}
              name={'optionText'}
              rules={{ minLength: { value: 3 }, maxLength: { value: 50 }, required: {value: true}}}
              render={({ field: { value, onChange } }) =>
                <Input placeholder="Option text" value={value} onChange={onChange} />}
            />
          </div>
        }
        return item.optionText;
      }
    },
    {
      title: 'Is correct',
      render: (_, item) => {
        if (item?.adding || item?.editing) {
          return <Controller
            control={control}
            name={'isCorrect'}
            defaultValue={item?.editing? item.isCorrect: true}
            render={({ field: { value, onChange } }) =>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={value}
                onChange={onChange}
              />}
          />
        }
        return item?.isCorrect ? <CheckOutlined /> : <CloseOutlined/>
      }
    },
    {
      title: 'Options',
      render: (_, item) => {
        if (item.adding || item.editing) {
          return <Layout style={{flexDirection: 'row', gap: 10}}>

            <Button onClick={handleSubmit(data => item?.editing?handleEditOption(data, item): handleAddOption(data))}>
              {item?.editing? 'Edit': 'Add'}
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Layout>
        }
        return <Layout style={{flexDirection: 'row', gap: 10}} aria-disabled={editing && !item?.editing}>
          <Button icon={<EditOutlined/>} onClick={() => handleEdit(item)}/>
          <Popconfirm
            okButtonProps={{danger: true}}
            overlayInnerStyle={{backgroundColor: '#001664'}}
            title="Are you sure?"
            okText="Yes"
            onConfirm={() => handleDeleteOption(item.ID)}
            cancelText="No">
            <Button icon={<DeleteOutlined/>} />
          </Popconfirm>
        </Layout>
      }
    }
  ];

  const [options, setOptions] = useState([])
  const params = useParams();
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(false)

  const { control, handleSubmit, formState: {isValid}, reset } = useForm({mode: 'onChange'})

  useEffect(() => {
    if (params.id) {
      setAdding(false)
      fetchOptions()
    }
  }, [params.id])

  const fetchOptions = () => {
    QuestionService.getOptions(params.id).then(response => {
      setOptions(response.data);
    })
  }

  const handleAdd = () => {
    setAdding(true);
    setEditing(true);
    reset()
    setOptions(values => ([...values, { adding: true }]))
  }

  const handleEdit = (item) => {
    setEditing(true)
    setAdding(true)
    reset()
    setOptions(values => {
      const result = [...values];
      const index = values.indexOf(item);
      result[index] = {...item, editing: true}
      return result;
    })
  }
  const handleCancel = () => {
    setAdding(false);
    setEditing(false);
    fetchOptions()
  }

  const handleAddOption = (values) => {
    OptionService.post({...values, questionId: +params?.id}).then(() => {
      setAdding(false)
      setEditing(false)
      fetchOptions();
    })
  }

  const handleEditOption = (values, item) => {
    OptionService.put(item.ID, {...item,...values}).then(() => {
      setAdding(false)
      setEditing(false)
      fetchOptions();
    })
  }

  const handleDeleteOption = (id) => {
    OptionService.delete(id).then(fetchOptions)
  }

  return <Layout style={{paddingLeft: 30, paddingRight: 30}}>
    {!adding && <FloatButton icon={<PlusOutlined style={{ color: '#000' }}/>}
                             onClick={handleAdd}
                             type="default"
                             shape={'square'}/>}

    <Table pagination={false} dataSource={options} columns={columns} rowKey={(item) => 'row-' + item.ID} />

  </Layout>

}

export default Question;
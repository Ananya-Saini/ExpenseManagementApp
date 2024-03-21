import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import { AreaChartOutlined, UnorderedListOutlined , EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Layout from '../components/layouts/layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from "moment";
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setShowModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState("all")
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)
  // table date
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'refrence'
    },
    {
      title: 'Actions',
      render : (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable (record)
            setShowModel(true)
          }}/>
          <DeleteOutlined className='mx-2' onClick={() => {handleDelete(record)}}/>
        </div>
      )
    },
  ]
  //useEffect Hook
  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transactions/get-transaction', { userid: user.userid, frequency, selectedDate, type, })
        setLoading(false)
        setAllTransaction(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error("Fetch issue!")
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  const handleDelete = async(record) => {
    try{
      setLoading(true)
      await axios.post('/transactions/delete-transaction', {transactionId:record._id})
      setLoading(false)
      message.success('Transaction Deleted')
    }catch(error){
      setLoading(false)
      console.log(error)
      message.error('Unable to delete!')
    }
  }
  //Form Handling
  const handleSubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
        console.log(user.userid)
        await axios.post('/transactions/edit-transaction', { payload: {
          ...value,
          userid: user.userid
        },
        transactionId: editable._id
      })
        setLoading(false)
        message.success("Transaction Updated successfully")
      }else{
        await axios.post('/transactions/add-transaction', { userid: user.userid, ...value })
      setLoading(false)
      message.success("Transaction added successfully")
      }
      setShowModel(false)
      setEditable(null)
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Failed to add transaction");
    }
  }
  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value='7'>LAST 1 Week</Select.Option>
            <Select.Option value='30'>LAST 1 Month</Select.Option>
            <Select.Option value='365'>LAST 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate} onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
          </Select>
        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
          <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModel(true)}>Add New</button>
        </div>
      </div>
      <div className='content'>
        {viewData === 'table' ?
          <Table columns={columns} dataSource={allTransaction} />
          : <Analytics allTransaction={allTransaction} />
        }

      </div>
      <Modal title={editable? "Edit Transaction" : "Add Transaction"} open={showModel} onCancel={() => setShowModel(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button htmltype="submit" className='btn btn-primary'>{" "}Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd'
import Layout from '../components/layouts/layout';
import axios from 'axios';
import Spinner from '../components/layouts/Spinner';

const HomePage = () => {
  const [showModel, setShowModel] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log('home page par user ki id: ', user.userId)
      setLoading(true)
      await axios.post('/transactions/add-transaction', {userid: user.userId, ...value })
      setLoading(false)
      message.success("Trasaction added successfully")
      setShowModel(false)
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
        <div>range filters</div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModel(true)}>Add New</button>
        </div>
      </div>
      <div className='content'></div>
      <Modal title="Add Transaction" open={showModel} onCancel={() => setShowModel(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
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
          <Form.Item label="Reference" name="reference">
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
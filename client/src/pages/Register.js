import React from 'react'
import { Form, Input, Button, message } from 'antd'
import "../styles/register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const Register = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinishHandler = async(values) => {
        try {
        dispatch(showLoading())
          const res = await axios.post("/api/v1/user/register", values)
        dispatch(hideLoading())
          if (res.data.success) {
            message.success("Register Successfully!")
            Navigate("/login")
          } else {
            message.error(res.data.message)
          }
        } catch (error) {
        dispatch(hideLoading())
          message.error("something went wrong to post data")
        }
      };
  return (
    <div className="form-container">
    <Form layout="vertical" onFinish={onFinishHandler} className="formstyling">
      <h3>Register Form</h3>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Link to="/login" className='p-2'>Already registered then Login here</Link>
      <Button className="btn btn-primary" type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  </div>
  )
}

export default Register
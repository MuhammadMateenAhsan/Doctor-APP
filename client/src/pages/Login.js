import React from 'react'
import { Form, Input, Button, message } from 'antd'
import "../styles/register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const Login = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
    const onFinishHandler = async(values) => {
       try {
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/login', values)
        window.location.reload()
        dispatch(hideLoading())
        if(res.data.success){
          localStorage.setItem('token', res.data.token)
          message.success('Login Successfully!')
          Navigate('/')
        }else{
          message.error(res.data.message)
        }
       } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error("Something went wrong")
       }
      };
  return (
    <div className="form-container centerform">
    <Form layout="vertical" onFinish={onFinishHandler} className="formstyling">
      <h3>Login Form</h3>
      <Form.Item label="Email" name="email" rules={[{type: 'email' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type="password" />
      </Form.Item>
      <Link to="/register" className='p-2'>Register here</Link>
      <Button className="btn btn-primary" type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  </div>
  )
}

export default Login
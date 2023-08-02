import Layout from '../components/Layout.js';
import React from 'react'
import { Form , Row , Col , Input, TimePicker , message} from "antd"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useSelector , useDispatch } from 'react-redux';
import {showLoading , hideLoading} from "../redux/features/alertSlice.js"

const ApplyDoctor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const handleFinish = async(values) => {
        try {
        dispatch(showLoading())
            const res = await axios.post("/api/v1/user/apply-doctor", {...values, userId:user._id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.success)
                navigate("/")
            }else{
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("something went wrong")
        }
    }
  return (
    <Layout> 
        <h1 className='text-center'>Apply Doctor</h1>
        <h4>Personal Details</h4>
        <Form layout='vertical' onFinish={handleFinish}>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item 
                    label="First Name"
                    name="firstName"
                    rules={[{required:true}]}
                    >
                        <Input type="text" placeholder='Your Name'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Last Name"
        name="lastName"
        rules={[{ required: true }]}
    >
        <Input type="text" placeholder='Your Last Name'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Phone"
        name="phone"
        rules={[{ required: true }]}
    >
        <Input type="text" placeholder='Your Phone Number'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Email"
        name="email"
        rules={[{ required: true }]}
    >
        <Input type="text" placeholder='Your Email'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Website"
        name="website"
    >
        <Input type="text" placeholder='Your Website'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Address"
        name="address"
        rules={[{ required: true }]}
    >
        <Input type="text" placeholder='Your Address'/>
    </Form.Item>
</Col>
</Row>
<h4>Professional Details:</h4>
<Row gutter={20}>
<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Specialization"
        name="specialization"
        rules={[{ required: true }]}
    >
        <Input type="text" placeholder='Your Specialization'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Experience"
        name="experience"
        rules={[{ required: true }]}
    >
        <Input type="text" placeholder='Your Experience'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Fees Per Consultation"
        name="feesPerConsultation"
        rules={[{ required: true, type: 'text' }]}
    >
        <Input type="number" placeholder='Your Fees'/>
    </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
    <Form.Item 
        label="Timings"
        name="timings"
        rules={[{ required: true }]}
    >
        <TimePicker.RangePicker format="HH:mm"/> 
    </Form.Item>
</Col>
            </Row>
            <div className='d-flex justify-content-end'>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor
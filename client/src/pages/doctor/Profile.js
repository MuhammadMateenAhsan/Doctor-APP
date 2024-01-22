import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout.js';
import {useParams} from "react-router-dom"
import axios from 'axios';
import moment from 'moment'
import { Form , Row , Col , Input, TimePicker , message} from "antd"
import {useNavigate} from "react-router-dom"
import { useSelector , useDispatch } from 'react-redux';
import {showLoading , hideLoading} from "./../../redux/features/alertSlice.js"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  const params = useParams()
  // ===========handle form===============
  const handleFinish = async(values) => {
    try {
    dispatch(showLoading())
        const res = await axios.post("/api/v1/doctor/updateDoctorProfile", {...values, userId:user._id , timings:[
            moment(values.timings[0].format('HH:mm')),
            moment(values.timings[1].format('HH:mm'))
        ]},
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
            message.error(res.data.message)
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error("something went wrong")
    }
}
  // ===========handle form===============

  
  const [doctor , setDoctor] = useState(null)
  const getDoctorInfo = async() => {
    try {
      const response = await axios.post("/api/v1/doctor/getDoctorInfo",{userId:params.id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      })
    //   console.log(response)
    if(response.data.success){
        setDoctor(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getDoctorInfo();
    //eslint-disable-next-line
  },[])
  return (
    <Layout>
        <h1 className='text-center'>Profile</h1>

      {doctor && (
           <Form layout='vertical' onFinish={handleFinish} initialValues={{...doctor,
           timings:[
            moment(doctor.timings[0],'HH:mm'),
            moment(doctor.timings[1],'HH:mm')
           ]
           }}>
            <h4>Personal Details</h4>
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
       rules={[{ required: true }]}
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
               <button type="submit" className="btn btn-primary">Update</button>
           </div>
       </Form>
      )}
      {
        !doctor && <h2>Doctor data not found</h2>
      }
    </Layout>
  )
}

export default Profile

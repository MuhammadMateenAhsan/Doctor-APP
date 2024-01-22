import { Row } from 'antd';
import Layout from '../components/Layout.js';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DoctorsList from '../components/DoctorsList.js';

const HomePage = () => {
  const [doctors, setDoctor] = useState([])
  const getUserData = async()=>{
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <Layout>
        <h1 className=''>Home Page</h1>
        <Row>
          {doctors && doctors.map(doctor=>(
            <DoctorsList doctor={doctor}/>
          ))}
        </Row>
    </Layout>
      )
}

export default HomePage
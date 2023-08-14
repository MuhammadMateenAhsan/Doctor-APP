import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout.js';
import {useParams} from "react-router-dom"
import axios from 'axios';
import { useSelector } from 'react-redux';
const Profile = () => {
  const {user} = useSelector(state=>state.user)
  const params = useParams()
  const [doctor , setDoctor] = useState(null)
  const getDoctorInfo = async() => {
    try {
      const response = await axios.post("/api/v1/doctor/getDoctorInfo",{userId:params.id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(response)
      if(response.data.success){
        setDoctor(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getDoctorInfo();
  },[])
  return (
    <Layout>Doctor Profile</Layout>
  )
}

export default Profile
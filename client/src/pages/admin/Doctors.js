import Layout from '../../components/Layout.js'
import React, { useEffect, useState } from 'react'
import {Table , message} from "antd"
import axios from "axios"

const Doctors = () => {
  const [doctors,setDoctors] = useState([])
  const getDoctors = async()=>{
    try {
      const response= await axios.get('/api/v1/admin/getAllDoctors',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if(response.data.success){
        setDoctors([...response.data?.data])
      }
  
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getDoctors();
  },[])

  // account update function
  const handleAccountChanged = async(record,status)=>{
    try {
      const response = await axios.post("/api/v1/admin/changeAccountStatus",
      {doctorId:record._id,userId:record.userId, status:status},
      {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
      })

      if(response.data.success){
        // message.success(`${record.firstName}'s Account Status Changed to :${status}`)
        message.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error("something went wrong!")
    }
  }

  const columns = [
    {
      title:'Id',
      render:(text,record)=>(
        <span>{record._id}</span>
      )
    }
    ,
    {
      title:"Name",
      dataIndex:"name",
      render:(text,record)=>(
        <span>{record.firstName}{" "+record.lastName}</span>
      )
    }
    ,
    {
      title:'Email',
      dataIndex: "email"
    }
    ,
    {
      title:"status",
      dataIndex:"status",
    }
    ,
    {
      title:"Phone",
      dataIndex:"phone"
    }
    ,
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record)=>(
        <div className='d-flex'>
          {
            record.status === "pending" ?(<button className='btn btn-success' onClick={()=>handleAccountChanged(record,"approved")}>Approve</button>):(<button className='btn btn-danger'>Reject</button>)
          }
        </div>
      )
    }
  ]

  return (
    <Layout>
    <h4>Doctors List</h4>
    <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
  }

export default Doctors
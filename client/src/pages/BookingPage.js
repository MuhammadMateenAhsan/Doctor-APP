import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker , message} from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
const BookingPage = () => {
 const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()
    const params = useParams()
    const [doctors, setDoctor] = useState([])
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [isAvailable, setIsAvailable] = useState()


    const getUserData = async()=>{
      try {
        const res = await axios.post('/api/v1/doctor/getDoctorById',
        {doctorId:params.doctorId},
        {
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        if(res.data.success){
          setDoctor(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const handleBooking = async()=>{
      try {
        dispatch(showLoading)
        const response = await axios.post('/api/v1/user/book-appointment',
        {
          doctorId:params.doctorId,
          userId:user._id,
          doctorInfo:doctors,
          date:date,
          userInfo:user,
          time:time,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
        )
        dispatch(hideLoading())
        if(response.data.success){
          message.success(response.data.message)
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error)
      }
    }
    useEffect(()=>{
      getUserData()
    },[])
  return (
    <Layout>
        <h1>Booking page</h1>
        {doctors ?(
        <div className='card p-2 m-2 w-50'
    >
        <div className="card-header">
            Dr. {doctors.firstName} {doctors.lastName}
        </div>
        <div className="card-body">
            <p>
                <b>Specialization:</b>  {doctors.specialization}
            </p>
            <p>
                <b>Experience:</b>  {doctors.experience}
            </p>
            <p>
                <b>Fees Per Consultation:</b>  {doctors.feesPerConsultation}
            </p>
            {/* <p>
  <b>Timings:</b> {moment(doctors.timings[0]).format("HH:mm A")} - to - {moment(doctors.timings[1]).format("HH:mm A")}
</p> */}

{doctors.timings && doctors.timings.length === 2 ? (
          <p>
            <b>Timings:</b>{" "}
            {moment(doctors.timings[0]).format("HH:mm A")} - to -{" "}
            {moment(doctors.timings[1]).format("HH:mm A")}
          </p>
        ) : (
          <p>Timings information not available.</p>
        )}

            <div className='d-flex flex-column w-50'>
                <DatePicker format="DD-MM-YYYY" onChange={(value)=>setDate(moment(value).format("DD-MM-YYYY"))}/>
                <TimePicker format="HH:mm" className='mt-1' onChange={(value)=>setTime(
                    moment(value).format("HH:mm")
                )
                }/>
            </div>
            <button type="submit" className="btn btn-primary mt-3 m-2">Check Availability</button>
            <button type="submit" className="btn text-white mt-3 bg-dark m-2" onClick={handleBooking}>Book Appointment</button>
        </div>
    </div>
    )
    :
    console.log("nothing to display")
    }
    </Layout>
  )
}

export default BookingPage
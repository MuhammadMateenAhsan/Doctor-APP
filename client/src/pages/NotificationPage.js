import { Tabs, message } from 'antd'
import  Layout  from '../components/Layout.js'
import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import axios from "axios"
import { showLoading , hideLoading } from '../redux/features/alertSlice.js'
import { useNavigate } from 'react-router-dom'

const NotificationPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const handlleMarkedRead = async()=>{
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/v1/user/get-all-notification",{userId:user._id},{
                headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }else{
            message.error(res.data.message)
        }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("something went wront")
        }
    }
    const handlleDeleteRead = async()=>{
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/v1/user/delete-all-notification",{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("something went wrong in Notification")
        }
    }
  return (
    <Layout>
        <h3>Notifications</h3>
        <Tabs>
        <Tabs.TabPane tab="Unread" key={0} >
            <div className="d-flex justify-content-end">
                <h4 className='p-3' style={{cursor:'pointer'}} onClick={handlleMarkedRead}>
                    Marked All as Read
                </h4>
            </div>
            {
                user?.notification.map((notificationMgs)=>(
                    <div className="card" onClick={()=>navigate(notificationMgs.onClickPath)}>
                        <div className="card-text">{notificationMgs.message}</div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        <Tabs.TabPane tab="read" key={1} >
            <div className="d-flex justify-content-end">
                <h4 className='p-3' style={{cursor:'pointer'}} onClick={handlleDeleteRead}>
                    Delete All
                </h4>
            </div>
            {
                user?.seennotification.map((notificationMgs)=>( 
                    <div className="card" onClick={()=>navigate(notificationMgs.onClickPath)}>
                        <div className="card-text">{notificationMgs.message}</div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage
import axios from 'axios'
import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/logo.svg'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import {useNavigate } from 'react-router-dom'


import {initializeSocket, setOnlineUsers, disconnectSocket} from '../../store/slice/socket/socket.slice'
import{setNewMessage} from "../../store/slice/message/message.slice"
import UserProfile from '../profile/UserProfile'


const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const{token, userDetails} = useSelector((state) => state.user)
  const{onlineUsers} = useSelector((state) => state.socketReducer)
  const{socket} = useSelector((state) =>state.socketReducer)
  const[profileModal, setProfileModal] = useState(false)
  const[showMessage, setShowMessage] = useState(false)

  console.log("socket", socket)
  
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [token])

  useEffect(() => {
    if (!token) return;
    dispatch(initializeSocket(userDetails?._id));
  }, [token]);

  useEffect(() => {
    if (!socket) return;
  
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
  
    socket.on("newMessage", (newMessage) => {
      console.log("📩 Received new message:", newMessage);
      dispatch(setNewMessage(newMessage));
    });
  
    return () => {
      dispatch(disconnectSocket()); // Properly close socket on unmount
    };
  }, [socket]);
  
  return (
    <>
    <div className="h-screen flex overflow-hidden relative ">
      {/* Sidebar (Fixed Width) */}
      <div className={`h-screen flex-shrink-0 transition-all duration-300 ${showMessage ? "hidden md:block md:max-w-[20em]" : "block w-full md:max-w-[20em"}`}>
        <UserSidebar setProfileModal={setProfileModal} setShowMessage={setShowMessage} />
      </div>

      {/* Chat Section (Takes Remaining Space) */}
      <div className={`flex-grow flex-col h-screen ${showMessage ? "block" : "hidden md:block"}`}>
        <MessageContainer setShowMessage={setShowMessage}/>
      </div>
    </div>
    {profileModal && (
      <div className='modal-overlay'>
        <UserProfile setProfileModal={setProfileModal}/>
      </div>
    )}
    </>
  )
}

export default Home
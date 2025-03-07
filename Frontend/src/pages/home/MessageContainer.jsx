import React, {useState, useEffect } from 'react'
import Message from './Message'
import SendMessage from './SendMessage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRef } from 'react'
import { setMessages } from '../../store/slice/message/message.slice'
import { RiChatDeleteFill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";

import { deleteChat } from './DeleteMessage'
import ConfirmationModal from '../commom/ConfirmationModal'
import toast from 'react-hot-toast'


const MessageContainer = ({setShowMessage}) => {

  const dispatch = useDispatch()

  const{selectedUser, token} = useSelector((state) => state.user)
  // console.log(selectedUser)
  const {messages} = useSelector((state) => state.messageReducer ?? []);
  // const[messages, setMessages] = useState([])
  const messagesEndRef = useRef(null); // Ref for scrolling

  const[confirmationModal, setConfirmationModal] = useState(null)

  const{onlineUsers} = useSelector((state) => state.socketReducer)
  const isUserOnline = onlineUsers?.includes(selectedUser?._id)

  useEffect(() =>{
    if(selectedUser?._id){
      (async() =>{
        const toastId = toast.loading("Loading...")
        try {
          const URL = `${import.meta.env.VITE_BASE_URL}/message/get-messages/${selectedUser._id}`
          const response = await axios.get(URL, {
            headers:{Authorization: `Bearer ${token}`},
            withCredentials:true,
          })

          console.log("Get Message API Response....", response)

          dispatch(setMessages(response?.data?.responseData?.messages))
        } catch (error) {
          console.log("Get Message API Error....", error)
        }
        toast.dismiss(toastId)
      })()
    }
  }, [selectedUser])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleDeleteChat = async (recieverId) => {
    await deleteChat(recieverId, token);
    dispatch(setMessages([])) // Clear messages from UI
    setConfirmationModal(false); // Close the modal
};

  return (
    <>
      {!selectedUser ? (
        <div className='flex w-full h-full  items-center justify-center flex-col gap-y-4'>
          <h1 className='text-2xl text-gray-200 font-semibold'>Welcome to QUICK CHAT!</h1>
          <p className='text-sm text-gray-400'>Please Select a User to start your Chat</p>
        </div>
      ):(
        <div className='flex flex-col h-full w-full'>
        {/* header */}
        <div className= ' bg-black px-6 py-2 text-white  flex flex-col sm:flex-row sm:justify-between gap-x-4 sm:items-center gap-y-4'>
          {/* user details */}
          <div className={`flex gap-x-4 items-center`}>
            <div className={`${isUserOnline ? "border-[3px] border-green-500 rounded-full" : ""} relative`}>
              <img src={selectedUser?.profile_pic}className='rounded-full w-[50px] h-[50px]'/>
              {isUserOnline && (
              <p className='w-3 h-3 rounded-full bg-green-500 absolute right-0 bottom-0'></p>)}
            </div>
            <div>
              <p>{selectedUser?.name}</p>
              <p className='text-xs text-gray-300'>{isUserOnline ? "Online" : "Offline"}</p>
            </div>
          </div>

          <div className='flex justify-between w-full sm:w-fit'>
            <button onClick={() => setShowMessage(false)} className="sm:hidden text-white text-3xl">
              <IoArrowBackCircle/>
            </button>
            {/* Delete chat Icon */}
            <div className=' flex gap-x-2 items-center'>
              Delete Chat
              <RiChatDeleteFill 
                className='text-white text-xl cursor-pointer'
                onClick={() => setConfirmationModal({
                  text1:"Are you sure",
                  text2:"Your complete chat will be deleted.",
                  btn1Text:"Cancel",
                  btn2Text:"Delete",
                  btn1Handler:() => setConfirmationModal(null) ,
                  btn2Handler: () => handleDeleteChat(selectedUser._id)
              })} 
              />
            </div>
          </div>
        </div>

        {/* Message : Chat area */}
        <div className="flex-grow bg-[#181a2f] overflow-y-auto p-3 pb-[80px] custom-scrollbar">
          {messages?.map((messageDetails) =>(
            <Message key={messageDetails?._id} messageDetails={messageDetails}>
            </Message>
          ))}
          <div ref={messagesEndRef} className='h-4' /> {/* Scroll to this element */}
        </div>

        {/* Send message */}
        <SendMessage/>

        {confirmationModal && (
          <ConfirmationModal modalData = {confirmationModal}/>
        )}
      </div>
      )}
    </>
  )
}

export default MessageContainer
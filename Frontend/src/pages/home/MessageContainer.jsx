import React, {useState, useEffect } from 'react'
import Message from './Message'
import SendMessage from './SendMessage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRef } from 'react'
import { setMessages } from '../../store/slice/message/message.slice'


const MessageContainer = () => {

  const dispatch = useDispatch()

  const{selectedUser, token} = useSelector((state) => state.user)
  console.log(selectedUser)
  const {messages} = useSelector((state) => state.messageReducer ?? []);
  // const[messages, setMessages] = useState([])
  const messagesEndRef = useRef(null); // Ref for scrolling

  useEffect(() =>{
    if(selectedUser?._id){
      (async() =>{
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
      })()
    }
  }, [selectedUser])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <div className= 'h-[60px] bg-black px-6 py-2 text-white flex gap-x-4 items-center'>
          <img src={selectedUser?.profile_pic}className='rounded-full w-[50px] h-[50px]'/>
          <div>
            <p>{selectedUser?.name}</p>
            <p className='text-xs text-gray-300'>{selectedUser?.email}</p>
          </div>
        </div>

        {/* Message : Chat area */}
        <div className="flex-grow bg-[#181a2f] overflow-y-auto p-3 pb-[80px] custom-scrollbar">
          {messages?.map((messageDetails) =>(
            <Message key={messageDetails?._id} messageDetails={messageDetails} />
          ))}
          <div ref={messagesEndRef} className='h-4' /> {/* Scroll to this element */}
        </div>

        {/* Send message */}
        
        <SendMessage/>
      </div>
      )}
    </>
  )
}

export default MessageContainer
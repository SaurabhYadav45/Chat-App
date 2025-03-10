import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage } from './DeleteMessage'
import { setMessages } from '../../store/slice/message/message.slice'
import { formatTime } from '../../utils/FormatDate'

const Message = ({messageDetails}) => {

  const dispatch = useDispatch()
  const{messages} = useSelector((state) => state.messageReducer)
  const{token} = useSelector((state) =>state.user)

  const{userDetails, selectedUser} = useSelector((state) => state.user)
  const[status, setStatus] = useState("Sending...")
  const[isModalOpen, setIsModalOpen] = useState(false)

  const[menuOpen, setMenuOpen] = useState(null)

  useEffect(() => {
    if (messageDetails?.status === true) {
      setStatus("Sent");
    }
  }, [messageDetails?.status]);


  const handleDeleteMessage = async (messageId) => {
    await deleteMessage(messageId, token);
    dispatch(setMessages(messages.filter(msg => msg._id !== messageId)));
    setMenuOpen(null); 
};

  return (
    <>
    <div
        className={`chat ${
          userDetails?._id === messageDetails?.senderId
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userDetails?._id === messageDetails?.senderId
                  ? userDetails?.profile_pic
                  : selectedUser?.profile_pic
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs text-white opacity-50">{formatTime(messageDetails?.createdAt)} </time>
        </div>
        {/* Display Image/Video */}
        {(messageDetails?.imageUrl || messageDetails?.videoUrl) && (
          <div className="chat-media">
            {messageDetails?.videoUrl.includes(".mp4") ? (
              <video src={messageDetails?.videoUrl} controls className="chat-video max-w-[300px] max-h-[300px] cursor-pointer" onClick={() => setIsModalOpen(true)}/>
            ) : (
              <img src={messageDetails?.imageUrl} alt="Sent Media" className="chat-image rounded-lg max-w-[300px] max-h-[300px] cursor-pointer" onClick={() => setIsModalOpen(true)} />
            )}
          </div>
        )}

      {/* Message Text */}
      {messageDetails?.message && (
        <div className="chat-bubble">
          {messageDetails.message}
          <span className='menu-icon' onClick={() => setMenuOpen(messageDetails?._id)}>⋮</span>
          {menuOpen === messageDetails?._id && (
            <div className="menu">
              <button onClick={() => handleDeleteMessage(messageDetails?._id)}>delete</button>
            </div>
          )}
        </div>
      )}

      {/* Status: Sending... or Sent */}
      <div className="text-xs text-gray-400 mt-1">{status}</div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-[90%] max-h-[90%]">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            {/* Full-Screen Media */}
            {messageDetails?.imageUrl.includes(".mp4") ? (
              <video src={messageDetails?.imageUrl} controls className="max-w-full max-h-full rounded-lg" />
            ) : (
              <img src={messageDetails?.imageUrl} alt="Full Screen" className="max-w-full max-h-full rounded-lg" />
            )}
          </div>
        </div>
      )}
      </>
  )
}

export default Message
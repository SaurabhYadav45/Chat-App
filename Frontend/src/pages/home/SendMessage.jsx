import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setNewMessage } from "../../store/slice/message/message.slice";

import EmojiPicker from 'emoji-picker-react';
import { FaRegSmile } from "react-icons/fa";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const SendMessage = () => {
  const dispatch = useDispatch()

  const{selectedUser, token} = useSelector((state) => state.user)
  const[message, setMessage] = useState("")
  const[uploading, setUploading] = useState(false)

  const[showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef()


// Handle EmojiClick
  const handleEmojiClick = (emojiObject)=>{
    // console.log("emojiObject",emojiObject)
    setMessage((prev) => prev + emojiObject.emoji)
  }

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Preview images & videos
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else if (file.type.startsWith("video/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(file.name); // Show file name for other types
      }
    }
  };

  // handle Send Message
  const handleSendMessage = async()=>{
    setUploading(true)
    const formData = new FormData()
    try {
      let messageType = "text";
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        messageType = "image";
      } else if (selectedFile.type.startsWith("video/")) {
        messageType = "video";
      } else {
        messageType = "file"; // For documents, PDFs, etc.
      }
    }
    // Append data
    formData.append("message", message);
    formData.append("messageType", messageType); // Send the message type
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
      const URL = `${import.meta.env.VITE_BASE_URL}/message/send/${selectedUser?._id}`
      const response = await axios.post(URL, formData, {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials:true,
      })

      console.log("Send Message API Response....", response)

      if(!response?.data?.success){
        throw new Error(response?.data?.message)
      }

      dispatch(setNewMessage(response?.data?.responseData))

      setMessage("")
      setSelectedFile(null);
      setFilePreview(null);
      setShowEmojiPicker(false);
    } catch (error) {
      console.log("Send Message API Error....", error)
    }
    finally{
      setUploading(false)
    }
  }

  

  const handleKeyDown = (e)=>{
    if(e.key === "Enter"){
      e.preventDefault()
      handleSendMessage()
    }
  }

  
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-900 fixed bottom-0 left-0 right-0 md:left-[320px] md:w-[calc(100%-320px)]">
      {/* File upload */}
      <label className="cursor-pointer">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <AiOutlinePaperClip size={24} className="text-gray-400 hover:text-white" />
      </label>

      {/* Emoji Picker Icon */}
      <div className="hidden sm:block">
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="relative">
        <FaRegSmile size={24} className="text-gray-400 hover:text-white" />
      </button>
      </div>
      {/* input message */}
      <input
        type="text"
        value = {message}
        placeholder="Type here..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input bg-black input-bordered input-primary flex-1 text-white"
      />
      <button 
        onClick={handleSendMessage}
        className="btn btn-square btn-outline btn-primary">
        {uploading? (
          <AiOutlineLoading3Quarters className="spinner bg-[#4e0eff] text-white" />
        ) : (
          <IoIosSend />
        )}
      </button>


      {/* Emoji Picker (shown when clicked) */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* File Preview Section */}
      {filePreview && (
        <div className="absolute bottom-16 left-4 bg-gray-800 p-2 rounded-lg flex items-center gap-2">
          {/* Show Image Preview */}
          {selectedFile.type.startsWith("image/") && (
            <img src={filePreview} alt="preview" className="w-24 h-16 rounded-md" />
          )}

          {/* Show Video Preview */}
          {selectedFile.type.startsWith("video/") && (
            <video src={filePreview} controls className="w-24 h-16 rounded-md"></video>
          )}

          {/* Show File Name for Other Files */}
          {!selectedFile.type.startsWith("image/") && !selectedFile.type.startsWith("video/") && (
            <p className="text-white">{filePreview}</p>
          )}

          {/* Remove File Button */}
          <button onClick={() => { setSelectedFile(null); setFilePreview(null); }}>
            <MdClose size={20} className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SendMessage;
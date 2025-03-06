import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegEdit } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { CgHello } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { toast } from "react-hot-toast";
import ConfirmationModal from '../commom/ConfirmationModal';
import { useNavigate } from "react-router-dom";

import { setUserDetails } from '../../store/slice/user/user.slice';
import { setDeleteAccount } from '../../store/slice/user/user.slice';
import { deleteAccount } from '../home/DeleteMessage';

const UserProfile = ({setProfileModal}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{token, userDetails} = useSelector((state) => state.user)

  const[editMode, setEditMode] = useState(false)
  const [previewImage, setPreviewImage] = useState(null);
  const[confirmationModal, setConfirmationModal] = useState(null)

  const[formData, setFormData] = useState({
    name:userDetails?.name ,
    about:userDetails?.about || "Write something about yourself..."
  })

  const fileInputRef = useRef(null)

  // handle image click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };


  // handle formdata change 
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle file change
  const handleFileChange = (event)=>{
    const file = event.target.files[0]
    if(file){
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)
    }
  }

  // handle file Upload
  const handleFileUpload = async()=>{
    const toastId = toast.loading("Uploading Image..")
    if(!previewImage) return

    const file = fileInputRef.current.files[0]
      const formData = new FormData()
      if(file){
        formData.append("file", file)
      }

    try {
      const URL = `${import.meta.env.VITE_BASE_URL}/user/update-profile-picture`
      const response = await axios.post(URL, formData, {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true,
      })

      console.log("Update Profile Picture Response......", response)
      toast.success("Profile Picture Updated Successfully")

      dispatch(setUserDetails(response?.data?.data))
      setPreviewImage(null)
    } catch (error) {
      toast.error("Failed to update Profile picture")
      console.log("Update Profile Picture API Error", error)
    }
    toast.dismiss(toastId)
  }
  
  // update user details
  const handleSave = async()=>{
    try {
      const URL = `${import.meta.env.VITE_BASE_URL}/user/update-user-details`
      const response = await axios.post(URL, {
        userId: userDetails._id,
        name: formData.name,
        about: formData.about,
      },{
        headers:{Authorization : `Bearer ${token}`}
      }
    )

    if(!response?.data?.success){
      throw new Error(response?.data?.message)
    }
    console.log("UPDATE USER DETAILS RESPONSE....", response)

    if(response?.status === 200){
      console.log(response?.data?.data)
      dispatch(setUserDetails(response?.data?.data))
      setEditMode(false)
    }
    } catch (error) {
      console.log("UPDATE USER DETAILS API ERROR...", error)
    }
  }

  // Handle Delete Account
  const handleDeleteAccount = async()=>{
    const toastId = toast.loading("Deleting Account...")
    try {
      const response = await deleteAccount(token)
      console.log("Delete Account Response", response)
      if(!response?.data?.success){
        throw new Error(response?.data?.message)
      }
      toast.success("Account Deleted Successfully.")
      dispatch(setDeleteAccount())
      setConfirmationModal(null)
      navigate("/login")
    } catch (error) {
      console.log("Failed to delete your account..", error)
      toast.error("Failed to Delete, Try again Later.")
    }
    toast.dismiss(toastId)
  }

  return (
    <div className="absolute flex bottom-0 left-2 w-[600px] h-[600px] border border-gray-400 rounded-md">
          {/* Left box */}
          <div className="hidden sm:flex flex-col w-1/3 pl-4  justify-between bg-gray-700 py-10 rounded-md">
            <div className='flex flex-col text-3xl font-bold text-red-200'>
              <p className='flex gap-x-4 items-center mb-6'>Hello..! <CgHello/></p>
              <p>{userDetails?.name}</p>
              <p className='text-sm my-4'>Thank you for using Quick Chat</p>
            </div>
            <div onClick={() =>setProfileModal(false)}
              className='py-2 !flex !items-start w-[100px] px-4 bg-blue-600 text-white rounded-sm cursor-pointer'>
              Go Back
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col rounded-md gap-y-8 bg-gray-800 text-gray-300  w-fit sm:w-2/3 py-6">
            {/* Go Back icon */}
            <div className='w-full flex justify-end pr-4'>
             <ImCross onClick={() =>setProfileModal(false)} className='cursor-pointer'/>
            </div>
            {/* profile-image */}
            <div className='mb-10 flex justify-center relative'>
              <img 
                src={userDetails?.profile_pic} 
                alt="profile-pic"
                onClick={handleImageClick}  
                className='w-[140px] h-[140px] rounded-full p-1 cursor-pointer'/>
                <RiImageEditFill onClick={handleImageClick} className='absolute bottom-2 text-2xl right-40 cursor-pointer'
                />
              <input
               type="file" 
               ref={fileInputRef}
               onChange={handleFileChange}
               style={{display:"none"}}
               accept='image/*'
              />
              {previewImage && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={handleFileUpload} style={{ padding: "8px 12px", backgroundColor: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Upload
                  </button>
                </div>
              )}
            </div>

            {/* name */}
            <div className='flex justify-between gap-x-2 px-12 items-center w-full'>
              {editMode ? (
                <input 
                  type="text" 
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='bg-gray-800 text-gray-100 py-2 px-2 w-full border border-gray-500 rounded-md'  
                />
              ) : (<p className='text-xl font-semibold'>{userDetails?.name}</p>)}
              <FaRegEdit onClick={() => setEditMode(true)}/>
            </div>

            {/* username */}
            {/* <div className='flex justify-between px-12 items-center w-full'>
              <p>{userDetails.email}</p>
              <FaRegEdit/>
            </div> */}

            {/* about */}
            <div className='flex justify-between gap-x-2 px-12 items-center w-full'>
              {editMode ? (
                <input
                 type="text"
                 name='about'
                 value={formData.about}
                 onChange={handleChange}
                 className='bg-gray-800 text-gray-100 py-2 px-2 w-full border border-gray-500 rounded-md'
                />
              ) : (
              <p>
                {userDetails?.about ? userDetails?.about : "Write something about yourself..."}
              </p>)}
              <FaRegEdit onClick={() => setEditMode(true)}/>
            </div>

            {/* Edit button */}
            <div className='flex w-full px-12'>
            {editMode ? (
              <button onClick={handleSave} 
              className='flex gap-x-4 items-center bg-yellow-400 text-gray-950 py-[4px] px-3 rounded-sm font-semibold'>
                Save
              <FaRegEdit className='font-semibold'/>
            </button>
            ) : (
              <button onClick={() => setEditMode(true)} 
              className='flex gap-x-4 items-center bg-yellow-400 text-gray-950 py-[4px] px-3 rounded-sm font-semibold'>
                Edit
              <FaRegEdit className='font-semibold'/>
            </button>
            )}
            </div>

            <div className='mt-12 flex justify-start px-8 rounded-md bg-gray-600 border border-gray-500 text-red-200 w-fit mx-12 p-2 font-semibold'
              onClick={() => setConfirmationModal({
                text1: "Are you Sure ?",
                text2: "Your Account will get Deleted Permanently.",
                btn1Text: "Cancel",
                btn2Text: "Delete",
                btn1Handler:()=> setConfirmationModal(null),
                btn2Handler:()=>handleDeleteAccount()
              })}
            >
              <button>
                Delete Account
              </button>
            </div>
          </div>

          {confirmationModal && (
          <ConfirmationModal modalData = {confirmationModal}/>
        )}
        </div>
  )
}

export default UserProfile
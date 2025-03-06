import React from 'react'
import img from "../../assets/img.jpg"
import Xpfp from "../../assets/Xpfp.jpg"
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from "../../store/slice/user/user.slice"

const User = ({user}) => {

  const dispatch = useDispatch()

  const{selectedUser} = useSelector((state) => state.user)
  const{onlineUsers} = useSelector((state) => state.socketReducer)

  const isUserOnline = onlineUsers?.includes(user._id)

  const handleUserClick = ()=>{
    dispatch(setSelectedUser(user))
  }

  return (
    <div 
      onClick={handleUserClick} 
      className={`flex items-center gap-4 hover:bg-gray-700 px-2 py-1 rounded-lg cursor-pointer ${user?._id === selectedUser?._id && "bg-gray-700"}`}>
      <div className={`${isUserOnline ? "rounded-full border-[3px] border-green-500" : ""} relative`}>
        <img src={user?.profile_pic} alt="" className='rounded-full w-[50px] h-[50px]'/>
        {isUserOnline && (
          <p className='w-3 h-3 rounded-full bg-green-500 absolute right-0 bottom-0'></p>)}
      </div>
        <div className='text-white'>
            <p>{user?.name}</p>
            <p className='text-xs text-gray-300'>{user?.about}</p>
        </div>
    </div>
  )
}

export default User
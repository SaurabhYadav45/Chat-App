import React from 'react'
import img from "../../assets/img.jpg"
import Xpfp from "../../assets/Xpfp.jpg"
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from "../../store/slice/user/user.slice"

const User = ({user}) => {

  const dispatch = useDispatch()

  const{selectedUser} = useSelector((state) => state.user)

  const handleUserClick = ()=>{
    dispatch(setSelectedUser(user))
  }

  return (
    <div 
      onClick={handleUserClick} 
      className={`flex items-center gap-4 hover:bg-gray-700 px-2 py-1 rounded-lg cursor-pointer ${user?._id === selectedUser?._id && "bg-gray-700"}`}>
      <div >
        <img src={user?.profile_pic} alt="" className='rounded-full w-[50px] h-[50px]'/>
      </div>
        <div className='text-white'>
            <p>{user?.name}</p>
            <p className='text-xs text-gray-300'>@{user?.email}</p>
        </div>
    </div>
  )
}

export default User
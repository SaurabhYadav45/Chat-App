import React from 'react'
import { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import User from './User';
import logo from "../../assets/logo.svg"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slice/user/user.slice';
import axios from 'axios';
import toast from 'react-hot-toast';



const UserSidebar = ({setProfileModal, setShowMessage}) => {

  const dispatch = useDispatch()

  const{userDetails, token} = useSelector((state) => state.user)
  // console.log("userDetails", userDetails)

  const[loading, setLoading] = useState(false)
  const[otherUsers, setOtherUsers] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    if (!searchValue.trim()) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers?.filter((user) =>
          user?.name?.toLowerCase().includes(searchValue?.toLowerCase())
        )
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() =>{
    (async() =>{
      const toastId = toast.loading("Loading...")
      try {
        setLoading(true)
        const URL = `${import.meta.env.VITE_BASE_URL}/user/get-other-users`
        const response = await axios.get(URL, {
          headers:{Authorization: `Bearer ${token}`},
          withCredentials: true,
        })
        console.log("Other User response.....", response)
        if(!response?.data?.success){
          throw new Error(response?.data?.message)
        }

        setLoading(false)
        setOtherUsers(response?.data?.responseData)
      } catch (error) {
        console.log("Other User response API Error....", error)
        setLoading(false)
      }
      toast.dismiss(toastId)
    })()
  }, [])

  const handleLogOut = ()=>{
    dispatch(logout())
  }


  return (
    <div className=' w-full h-screen flex flex-col border-r border-r-gray-600 md:max-w-[20em]'>
        {/* Name */}
        <div className='flex mx-2 border border-gray-600 bg-black rounded-lg mt-3 sm:px-2 py-1 text-[#4e0eff] gap-x-4'>
          <img src={logo} alt="" className='w-[30px] h-[30px]' />
          <p className="text-xl font-semibold text-center text-white ">QUICK CHAT</p>
        </div>
        {/* Searchbar */}
        <div className="mx-2 border border-gray-600 my-2 rounded-lg">
          <label className="input input-bordered flex items-center gap-2 bg-black ">
            <input
              type="text"
              placeholder="Search User"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input input-sm w-full max-w-sm text-gray-100" />
            <IoSearch  className='text-gray-400'/>
          </label>
        </div>

        <div className='h-full overflow-y-auto px-3 flex flex-col gap-2 border-b border-b-gray-600 '>
          {
            users?.map((user) => (
              <div key={user?._id} onClick={() => setShowMessage(true)}>
                <User user = {user}/>
              </div>
            ))
          }
        </div>
        
        {/* profile and logout */}
        <div className='flex justify-between items-center px-4 text-white bg-black py-2'>
          <div onClick={() => setProfileModal(true)} className='cursor-pointer flex gap-x-2 items-center'>
            <img src={userDetails?.profile_pic} alt="img" className='w-[50px] h-[50px] rounded-full ' />
            <p className='text-white'>{userDetails?.name}</p>
          </div>
          <button onClick={handleLogOut}
          className='bg-[#4e0eff] h-fit px-4 py-2 rounded-lg font-semibold'>Logout</button>
        </div>

        {}
    </div>
  )
}

export default UserSidebar
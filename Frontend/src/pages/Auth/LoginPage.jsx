import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from "../../assets/logo.svg"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import {setUserDetails, setToken} from "../../store/slice/user/user.slice"

const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{token} = useSelector((state) => state.user)
    
      useEffect(() =>{
          if(token){
            navigate("/")
          }
        }, [])
    
   
  const[values, setValues] = useState({
    email:"",
    password:"",
  })


  const handleOnChange = (event)=>{
    // console.log(event.target)
    const{name, value} = event.target
    setValues((prev) => {
      return {...prev, [name] : value}
    })
  }

  const handleValidation = ()=>{
    const{email, password} = values

    if(email?.length === 0){
      toast.error("Please enter the email")
      return false
    }
    else if(password?.length === 0){
      toast.error("Please enter the password")
      return false
    }
    return true
  }


  const handleSubmit = async(event)=>{
    const toastId = toast.loading("Loading...")
    event.preventDefault()
    if(handleValidation()){
        const URL = `${import.meta.env.VITE_BASE_URL}/user/login`

        try {
            const response = await axios.post(URL, values)

            console.log("Login API Response...", response)

            if(response?.data?.success){
                toast.success(response?.data?.message)
                setValues({
                    email:"",
                    password:"",
                })

                dispatch(setUserDetails(response?.data?.responseData?.user))
                dispatch(setToken(response?.data?.responseData?.token))

                localStorage.setItem("token", JSON.stringify(response?.data?.responseData?.token))
                localStorage.setItem("userDetails", JSON.stringify(response?.data?.responseData?.user))
                navigate("/")
            }
        } catch (error) {
            console.log("LOGIN API ERROR......", error)
            toast.error("Login Failed, Please try again later.")
        }
    }
    toast.dismiss(toastId)
  }

  return (
    <div className=' w-screen h-screen flex justify-center items-center'>
        <div className='bg-[#00000076] h-fit flex flex-col items-center justify-center sm:p-6'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 !p-6 w-full !px-16 !py-5'>
            <div className='flex items-center justify-center gap-x-2.5'>
              <img src={logo} alt="logo" width="70px" height="70px"/>
              <h1 className='text-white text-3xl font-bold '>QUICK CHAT</h1>
            </div>
            {/* email */}
            <div className='flex flex-col text-white text-sm gap-y-2'>
              <label htmlFor="email">Enter email</label>
              <input
              type="email" 
              name= "email"
              value={values.email}
              placeholder='Email'
              onChange={handleOnChange}
              className='border-2 placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#7046e4] outline-none'
              />
            </div>
            {/* password */}
            <div className='flex flex-col text-white text-sm gap-y-2'>
              <label htmlFor="password">Enter password</label>
              <input
              type="password" 
              name="password"
              value={values.password}
              placeholder='Password'
              onChange={handleOnChange}
              autoComplete="current-password"
              className='border-2 placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#997af0] outline-none'
              />
              <p  onClick={() => navigate("/forgot-password")}
                  className='text-xs font-semibold text-red-300 cursor-pointer'>
                  Forget Password ?
              </p>
            </div>
            {/* button */}
            <button type='submit' className='bg-[#4e0eff] text-white font-semibold text-sm !py-2 rounded-sm tracking-widest cursor-pointer hover:bg-blue-600'>Sign In</button>
          </form>

          <span className='text-[#f3f3f3aa] text-sm'>
              Dont't have an acount, New User ? 
              <Link to="/register" className='text-lg text-[#4e0eff] font-bold !ml-5 
              hover:text-red-300'>
                SignUp.
              </Link>
            </span>
        </div>
    </div>
  )
}

export default LoginPage

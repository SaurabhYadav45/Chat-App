import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

import {setUserDetails, setToken} from "../../store/slice/user/user.slice"

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const{token} = useSelector((state) => state.user)
  const[loading, setLoading] = useState(false)

  useEffect(() =>{
    if(token){
      navigate("/")
    }
  }, [token, navigate])

  const[values, setValues] = useState({
    name:"",
    email : "",
    password:"",
    confirmPassword:"",
  })


  const handleChange = (event) =>{
    setValues({...values, [event.target.name] : event.target.value})
  }

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = values;
  
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return false;
    }
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
  
    return true;
  };  


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate input fields
    if (!handleValidation()) return;
    setLoading(true)
  
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/user/register`
      const response = await axios.post(url, values)
      console.log("Register API Response........", response);

      if(response?.data?.success){
        toast.success(response.data.message)
        setTimeout(() => {
          setValues({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }, 500);
        console.log("response",response)
        dispatch(setUserDetails(response?.data?.responseData?.user))
        dispatch(setToken(response?.data?.responseData?.token))

        localStorage.setItem("token", JSON.stringify(response?.data?.responseData?.token))
        localStorage.setItem("userDetails", JSON.stringify(response?.data?.responseData?.user))
        navigate("/")
      }

    } catch (error) {
      console.log("Register API Response ERROR..........", error);
      toast.error(error?.response?.data?.message || "Something went wrong! Please try again.");
    }
    finally{
      setLoading(false)
    }
  };
  

  return (
      <div className=' w-screen h-screen flex justify-center items-center'>
        <div className='bg-[#00000076] flex-col items-center justify-center sm:p-6'>
          <form onSubmit={(event) => handleSubmit(event)} className='flex flex-col gap-y-4 !p-6 w-full'>
            {/* logo and Name */}
            <div className='flex items-center justify-center gap-x-2.5 '>
              <img src={logo} alt="logo" height="70px" width= "70px"/>
              <h1 className='text-white text-3xl font-bold '>QUICK CHAT</h1>
            </div>
            {/* name */}
            <div className='flex flex-col text-white text-sm gap-y-2'>
              <label htmlFor="name" >Enter Your Name</label>
              <input 
                type="text" 
                name='name'
                placeholder='Fullname'
                onChange={(e) => handleChange(e)}
                required
                value={values.name}
                className='border-2 placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#997af0] outline-none'
              />
            </div>
            {/* email */}
            <div className='flex flex-col text-white text-sm gap-y-2'>
              <label htmlFor="email">Enter Your Email</label>
              <input
                type="email" 
                placeholder='Email'
                name='email'
                onChange={(e) => handleChange(e)}
                required
                value={values.email}
                className='border-2 placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#997af0] outline-none'
              />
            </div>
            {/* password */}
            <div className='flex flex-col text-white text-sm gap-y-2'>
              <label htmlFor="password">Enter the Password</label>
              <input
                type="password"
                placeholder='Password'
                name="password"
                onChange={(e) => handleChange(e)}
                required
                value={values.password}
                autoComplete="current-password"
                className='border-2 placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#997af0] outline-none'
              />
            </div>
            {/* confirmPassword */}
            <div className='flex flex-col text-white text-sm gap-y-2'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                placeholder='confirmPassword'
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                required
                value={values.confirmPassword}
                autoComplete="current-password"
                className='border-2 w-full placeholder:pl-2 border-[#4e0eff] bg-transparent rounded-sm !py-1 focus:border-2 focus:border-[#997af0] outline-none'
              />
            </div>
            <button type='submit' disabled={loading} className='bg-[#4e0eff] text-white   font-semibold text-sm !py-2 rounded-sm tracking-widest cursor-pointer'>
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <span className='text-[#f3f3f3aa] text-sm ml-6 mb-6 pb-4 mx-auto'>
            Already have an account ? 
            <Link to="/login" className='text-lg text-[#4e0eff] font-bold !ml-5 hover:text-red-300'>
              Login.
            </Link>
          </span>
        </div>
      </div>
  )
}

export default RegisterPage
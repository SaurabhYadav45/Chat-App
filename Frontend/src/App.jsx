import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import  axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from './store/slice/user/user.slice'
// import { RouterProvider } from 'react-router-dom'
// import router from './routes/index.jsx'
function App() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.status === 200) {
          dispatch(setUserDetails(response?.data?.data)); // Store updated user details in Redux
        }
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [token, dispatch]); // Runs when token changes

  return (
    <>
      {/* <RouterProvider router={router} />; */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

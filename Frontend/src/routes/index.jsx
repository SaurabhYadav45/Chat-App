import App from "../App.jsx"
import {createBrowserRouter} from "react-router-dom"
import RegisterPage from "../pages/Auth/RegisterPage.jsx"
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx"
import Home from "../pages/home/Home.jsx"
import LoginPage from "../pages/Auth/LoginPage.jsx"
import ProtectedRoute from "../components/ProtectedRoute.jsx"


const router = createBrowserRouter([
        
    {
        path : "register",
        element : <RegisterPage/>
    },
    {
        path : 'login',
        element : <LoginPage/>
    },
    {
        path : 'forgot-password',
        element : <ForgotPassword/>
    },
    {
        path : "",
        element:<ProtectedRoute>
                    <Home/>
                </ProtectedRoute>,
    }
    ])
    
    export default router
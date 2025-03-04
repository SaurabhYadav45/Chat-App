import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate }  from "react-router-dom"



const ProtectedRoute = ({children})=>{
    const{token} = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() =>{
        if(!token){
            navigate("/login")
        } 
    }, [token])

    return token ? children : null;
}

export default ProtectedRoute;
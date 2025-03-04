const BASE_URL = import.meta.env.VITE_BASE_URL
import axios from "axios"


export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{
        ContentType:"application/json"
    },
});
import axios from "axios";
import  {baseUrl} from "./apiPath.js";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000, //30 seconds timeout for production (backend wake-up time)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
// Request Interceptor
axiosInstance.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem("token")
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error);
  }
)
// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error)=>{
    // Handle common error globally
    if(error.response){
      if(error.response.status === 401){
        // Unauthorized → redirect to login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
)



export default axiosInstance;
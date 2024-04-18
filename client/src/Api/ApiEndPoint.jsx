import axios from "axios";

// http://localhost:5000/api
const instances = axios.create({
    baseURL:"https://mern-jwt-auth-frontend.vercel.app/api"
})


export const post =(url,data)=>instances.post(url,data)

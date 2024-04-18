import axios from "axios";

// http://localhost:5000/api
const instances = axios.create({
    baseURL:`https://mern-jwt-auth-3.onrender.com/api` 
})


export const post =(url,data)=>instances.post(url,data)

import axios from "axios";

// http://localhost:5000/api
const instances = axios.create({
    baseURL:"http://localhost:5000/api"
})


export const post =(url,data)=>instances.post(url,data)

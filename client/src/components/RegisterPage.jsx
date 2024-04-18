import React, { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {Eye,EyeOff} from "lucide-react"
import { post } from '../Api/ApiEndPoint'
import toast from 'react-hot-toast'
import { useUserAuth } from '../Auth/userAuth'

const RegisterPage = () => {
  const navigate = useNavigate();
  const {token}=useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username:"",
    email:"",
    password:"",
  })
  useEffect(() => {
    if(token){
      navigate("/dashboard")
    }
  }, [token,navigate])
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  const handleChange = (e) =>{
    const {name,value} = e.target
    setUser({
      ...user,
      [name]:value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const registerUser = await post("/register",user)
      const response = registerUser.data
      if(response.success){
        toast.success(response.message)
        navigate("/")
      }
      setUser({
        username:"",
        email:"",
        password:"",
      })
    } catch (error) {
     alert("user already exits")
     setUser({
      username:"",
      email:"",
      password:"",
    })
    }
  }

  return (
    // Registration Page 
    <div className="Register-page font-[sans-serif] rounded-l-3xl border bg-gray-900 text-[#333] ml-52 mr-52 mt-12">
     <div className="grid  md:grid-cols-2 items-center gap-8 h-full">
       <div className="image-part max-md:order-1 p-4">
         <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"/>
       </div>
       <div className="flex items-center md:p-8 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
       <form className="max-w-lg  w-full mx-auto"onSubmit={handleSubmit}>
          <div className="mb-12">
            <h3 className="text-4xl mt-2  font-extrabold">Create an account</h3>
          </div>
          <div>
            <label className="text-xs block mb-2">Username*</label>
            <div className="relative flex items-center">

              <input name="username" value={user.username} type="text" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter username"onChange={handleChange} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Email*</label>
            <div className="relative flex items-center">

              <input name="email" value={user.email} type="email" required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter email" onChange={handleChange}/>

              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <label className="text-xs block mb-2">Password*</label>
            <div className="relative flex items-center">
              <input name="password" value={user.password} type={showPassword ? 'text' : 'password'}
        onChange={handleChange} required className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter password" />
              {showPassword ? (
                <Eye className="w-[20px] h-[20px] absolute right-2 cursor-pointer text-gray-400" onClick={togglePasswordVisibility} />
              ) : (
                <EyeOff className="w-[20px] h-[20px] absolute right-2 cursor-pointer text-gray-400" onClick={togglePasswordVisibility} />
              )}     
            </div>
          </div>
          <div className="flex items-center mt-8">
            <input id="remember-me" name="remember-me" required type="checkbox" className="h-4 w-4 shrink-0 rounded" />
            <label className="ml-3 block text-sm">
              I accept the <span className="text-blue-500 font-semibold hover:cursor-pointer ml-1">Terms and Conditions</span>
            </label>
          </div>
          <div className=" mt-12">
            <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#333] hover:bg-[#222] focus:outline-none">
            Create an account
            </button>
            <p className="bottom-part flex justify-center text-sm mt-8">Already have an account? <span className="text-blue-500 font-semibold hover:cursor-pointer ml-1"onClick={()=>navigate("/")}>Login here</span></p>
          </div>
        </form>
       </div>
     </div>
   </div>
  )
}

export default RegisterPage
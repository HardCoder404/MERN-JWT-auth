import React, { useState,useEffect } from 'react'
import {json, useNavigate} from "react-router-dom"
import {Eye,EyeOff} from "lucide-react"
import { post } from '../Api/ApiEndPoint'
import toast from 'react-hot-toast'
import { useUserAuth } from '../Auth/userAuth'

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {setToken,token} = useUserAuth()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      document.title="Login - Todos"
      if(token){
        navigate("/dashboard")
      }
    }, [token,navigate])

    const [user, setUser] = useState({
      email:"",
      password:"",
    })
  
    const handleChange = (e) =>{
      const {name,value} = e.target
      setUser({
        ...user,
        [name]:value
      })
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleSubmit = async(e)=>{
      e.preventDefault()
setLoading(true)

      try {
        const loginUser = await post("/login",user)
        const response  = loginUser.data 
        // console.log(response);
        if(response.success){
          navigate("/dashboard")
          toast.success(response.message)
          console.log("myuser",response.data.IsUser);
          localStorage.setItem("token",JSON.stringify(response.data.token))
          localStorage.setItem("IsUser",JSON.stringify(response.data.IsUser))
          setToken(response.data.token)
          setToken(response.data.IsUser)
        }
        setUser({
          email:"",
          password:"",
        })

      } catch (error) {
       alert("invalid crudentials")
       setUser({
        email:"",
        password:"",
      })
      }finally{
        setLoading(false)
      }
    }
  return (
     // Login Page : 
     <div className="login-page font-[sans-serif] backdrop-blur-lg bg-gray-900 text-[#333] ml-52 mr-52 mt-12 border rounded-l-3xl">
     <div className=" grid md:grid-cols-2 items-center gap-8 h-full">
       <div className="image-part max-md:order-1 p-4">
         <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"/>
       </div>
       <div className="flex items-center md:p-12 p-6 bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
         <form className="max-w-lg w-full mx-auto"onSubmit={handleSubmit}>
           <div className="mb-12">
             <h3 className="text-4xl font-extrabold">Sign in</h3>
             <p className="text-sm mt-4 ">Don't have an account ?<span className="text-blue-600 font-semibold hover:cursor-pointer ml-1 whitespace-nowrap" onClick={()=>navigate("/register")}>Register here</span></p>
           </div>
           <div>
             <label className="text-xs block mb-2">Email</label>
             <div className="relative flex items-center">

               <input name="email" type="email" value={user.email} required  className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none" placeholder="Enter email" onChange={handleChange}/>

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
           <div className="mt-8">
             <label className="text-xs block mb-2">Password</label>
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
           <div className="flex items-center justify-between gap-2 mt-5">
             <div className="flex items-center">
              <label>
               <input id="remember-me" name="remember-me" required type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
               <span className='ml-2 relative bottom-[3px] text-sm'>Remember me</span>
               </label>
             </div>
             <div>
               <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                 Forgot Password?
               </a>
             </div> 
           </div>
           <div className="mt-12">
            <button type="submit" disabled={loading} className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#333] hover:bg-[#222] focus:outline-none">
             {loading  ? (
                                    <div role="status" className='flex justify-center items-center'>
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
           </button>
           
           </div>
           <p className="my-8 text-sm text-gray-400 text-center">or continue with</p>

           {/* Logos  */}
           <div className="space-x-8 flex justify-center">
             <button type="button"
               className="border-none outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                 <path fill="#fbbd00"
                   d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                   data-original="#fbbd00" />
                 <path fill="#0f9d58"
                   d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                   data-original="#0f9d58" />
                 <path fill="#31aa52"
                   d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                   data-original="#31aa52" />
                 <path fill="#3c79e6"
                   d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                   data-original="#3c79e6" />
                 <path fill="#cf2d48"
                   d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                   data-original="#cf2d48" />
                 <path fill="#eb4132"
                   d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                   data-original="#eb4132" />
               </svg>
             </button>
             <button type="button"
               className="border-none outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#000" viewBox="0 0 22.773 22.773">
                 <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" data-original="#000000"></path>
               </svg>
             </button>
             <button type="button"
               className="border-none outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#007bff" viewBox="0 0 167.657 167.657">
                 <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" data-original="#010002"></path>
               </svg>
             </button>
           </div>
         </form>
       </div>
     </div>
   </div>
  )
}

export default LoginPage
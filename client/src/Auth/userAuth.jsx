import {  createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext()
const Userprovider=({children})=>{
    const [token,setToken]=useState(null)
    const [user,setuser]=useState(JSON.parse(localStorage.getItem("IsUser")) || null)
    const [Loading,setLoading]=useState(true)

    useEffect(()=>{
        const storeToken = JSON.parse(localStorage.getItem("token"))
        setToken(storeToken)
        setLoading(false)
    },[])

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("IsUser")
        setToken(null)
        setuser(null)
    }
    if(Loading){
        return null
    }
    return (
    <>
    <UserContext.Provider value={{token,user,setToken,setuser,logout}}>
        {children}
    </UserContext.Provider>
    </>
    )
}


export const useUserAuth = ()=>useContext(UserContext)
export default Userprovider
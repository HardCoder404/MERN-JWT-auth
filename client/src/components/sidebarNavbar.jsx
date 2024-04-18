import React, { useEffect, useState } from 'react'
import { ClipboardCheck,LayoutDashboard ,LogOut} from 'lucide-react';
import {useNavigate} from "react-router-dom"
import { useUserAuth } from '../Auth/userAuth';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast'


const SidebarNavbar = () => {
    const navigate = useNavigate();
    const {token,logout}=useUserAuth()
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
      setShowConfirmation(true);
    };
  
    const handleConfirmLogout = () => {
      // Logic to perform logout
      logout()
      toast.success("logout successfully")
      // Example: logoutUser();
      setShowConfirmation(false);
    };
  
    const handleCancelLogout = () => {
      setShowConfirmation(false);
    };

      useEffect(() => {
        if(!token){
          navigate("/")
        }
      }, [token,navigate])


  return (
    <div>
         {/* side bar  */}
         <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <div className="flex ms-2 md:me-24 cursor-pointer"onClick={()=>navigate("/dashboard")}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxsSYBOs3mZVAZfsbJ80cuxu28Ww6aIiP1dYUNcI43Yg&s" className="h-8 me-3" alt="todos logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Todos</span>
              </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div>
                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span className="sr-only">Open user menu</span>
                      <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 shadow-xl " aria-label="Sidebar">
        <div className="h-full px-3 flex flex-col bg-white">
            <ul className="space-y-2 flex h-full flex-col font-medium "> 
            <div>
              <li>
                  <NavLink to="/dashboard">
                  <span className="flex items-center p-2  rounded-lg cursor-pointer hover:bg-violet-200">
                  <LayoutDashboard/>
                  <span className="ms-3">Dashboard</span>
              </span>
                  </NavLink>
              </li>
              <li>
             <NavLink to="/tasks">
             <span className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-violet-200">
            <ClipboardCheck />
            <span className="ms-3">My Tasks</span>
            </span>
                  </NavLink>
              </li>
            </div>

        <div className="flex flex-col h-full justify-end">
            <button className="w-full border-t flex items-center text-start p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={handleLogout}>
              <LogOut />
              <span className="flex-1 ms-3 text-lg whitespace-nowrap">Logout</span>
            </button>
        </div>


        <div>

      {/* Confirmation modal */}
      {showConfirmation && (  
        <div
          id="popup-modal"
          className="fixed inset-0 w-screen flex justify-center items-center z-50 bg-gray-700 bg-opacity-60"
          onClick={() => setShowConfirmation(false)} // Close modal when clicking outside
        >
           <div className="absolute w-screen inset-0 flex items-center justify-center">
          <div className="relative pop-up bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M12.121 7.121a.5.5 0 01.707.707L10.707 10l2.121 2.121a.5.5 0 01-.707.707L10 10.707 7.879 12.828a.5.5 0 01-.707-.707L9.293 10 7.172 7.879a.5.5 0 01.707-.707L10 9.293l2.121-2.122z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to log out?
              </h3>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, log out
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleCancelLogout}
              >
                No, cancel
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
        </div>
            </ul>
        </div>
      </aside>
    </div>
  )
}

export default SidebarNavbar
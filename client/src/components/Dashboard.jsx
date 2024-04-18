import React from 'react'
import SidebarNavbar from './sidebarNavbar'
import {MicOff,Circle,BookOpenCheck} from "lucide-react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

// *************** to get the data from Local storage *****************


// ab humne niche set krdia tha apne local Item ko ab get v toh krna pdega ...toh wo hum yha kr re h
export const getLocalItems = ()=>{              
  let listItem = localStorage.getItem('Lists')        // simple hai.. localstorage.getItem() krdo bs ..or ha esme v string format me hi hoga... or jo hoga na..wo whi wala hoga jo niche setItems me phala wala likha tha means ki key, mtlb niche humne   likha tha na Lists whi yha likhna hia..bs ase hi use hota h LocalStorage.

  if(listItem){    
    return JSON.parse(localStorage.getItem('Lists') )    // see..ab baat ye h ki.. yha hume data mil raha hoga string format me ..or niche useState(getLocalItems()); <---- yha humara () eske andar array expect kr ra hai..toh eslie humne json.parse kra taki..wo object me convert hojaye(object m hoga tab v chl jyga) 
  }else{
    return []     // or simply.. agar list me kuch v nahi hota..toh simple array return krdo.
  }
}


const Dashboard = () => {
  const navigate = useNavigate()
  const {
    transcript,resetTranscript,listening,
  } = useSpeechRecognition();
const [micActive, setMicActive] = useState(false); 
const [Input, setInput] = useState("");
const [items, setitems] = useState(getLocalItems());         // yha humne call kra h getlocalitem ko taki.. hum value get kr paye..after refresh vi...or humne yhi pe hi q call kri?? qki..yhi data store hora hai na sara jo v list down kr re hai.. esliee...


// Toggle mic activation
const toggleMic = () => {
  if (listening) {
    SpeechRecognition.stopListening();
  } else {
    setInput("");
    SpeechRecognition.startListening();
  }
  setMicActive(!listening);
};


// Adding items 
const addItems = () => {
  if (!Input.trim() && !transcript.trim()) {
      alert("Please Enter Something");
      return;
  }

  // Use transcript if available, otherwise use Input
  const newItem = transcript.trim() || Input.trim();
  toast.success("item added successfull")
  setitems([...items, newItem]);
  setInput(""); // Clear the input field 
  resetTranscript();
};

// Listen for speech recognition events to update micActive state
useEffect(() => {
  setMicActive(listening);
}, [listening]);

// *********  Add data to local storage  ************
useEffect(() => {
  localStorage.setItem('Lists',JSON.stringify(items))   // yha setItem jo hai wo key,value format me data leta hia..ab eska kya mtlb hai? mtlb ki jo pahala wala hoga wo toh string format me hoga..or uska naam tum kuch v rkh sakte ho..jaise maine avi yha lists rkha hai..toh jaroori nahi yhi hoga kuch v rkh sakte ho..like abc,xyz..etc. 

  // Yha jo dono data hoti hai..wo string format me hi hogi...mtlb local storage me data hmesa string format me hi jata hia..toh agar tumhara string format me nahi h toh use string me bnao... yha mai JSON.Stringify use kr ra hu ..usko string m convert krne k lie
}, [items])   // yha pe humne items hi q lie? qki...hum items me hi toh sare task list down krwa re h 

  return (
      
    <div>
      <SidebarNavbar/>
    {/* main content  */}
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
    <div className="w-full max-w-sm p-4 border bg-white border-gray-200 rounded-3xl shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    
    <h1 className='font-bold text-2xl text-center mb-2'>TODO List</h1>
    <hr className='text-gray-400 font-bold shadow-lg border  mb-10' />

    <form className="flex items-center max-w-lg mx-auto" onSubmit={(e)=>e.preventDefault()}>   
        <div className="relative ml-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <BookOpenCheck className='text-gray-400 font-sans' size={20}/>
            </div>
            <input type="text" id="voice-search" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-64 ps-10 pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"placeholder="Enter your Tasks"  value={Input || transcript} onChange={(e)=>setInput(e.target.value)}/>
            
            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3" onClick={toggleMic}>
                  {micActive ? <Circle className="w-4 h-4 text-red-500 dark:text-red-400 hover:text-red-900 dark:hover:text-red bg-red-500 rounded-full border-4 border-gray-300"/> :  <MicOff className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" /> }
              </button>
        </div>

        
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none  dark:bg-blue-600" onClick={addItems}>
        +Add
        </button>
    </form>


    {/* Remove All button  */}
    <button type="button" className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-md px-5 py-[8px] inline-flex justify-center w-full text-center"onClick={()=>navigate("/tasks")}>Go to Task</button>
    </div>   
    </div>  

    </div>
  )
}

export default Dashboard
import React, { useState } from "react"
import { IoIosClose } from "react-icons/io";


function Modal({ontest}){
  
    return (<>
  
    <div className={`w-svw h-svh bg-blur flex justify-center items-center `} >
        
        <div className={`lg:w-[34rem] sm:w-[20rem] sm:h-[12rem] lg:h-[18rem] bg-amber-50 flex justify-center items-center rounded-lg`}>Welcome to my website</div>
       <button type="button" onClick={ontest} className="text-black font-bold text-2xl relative -top-32 right-8 cursor-pointer"><IoIosClose /></button>
    </div>
    </>)
}

export default Modal
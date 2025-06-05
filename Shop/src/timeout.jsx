import React,{ useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io";

function TimeOut({ontest}){
    const [Loading,setLoading]=useState(true)
    useEffect(()=>{
        setTimeout(()=>{
        setLoading(true)
        },3000)

    },[])
    return   ( <>
    {Loading && (<div className={`w-svw h-svh bg-blur flex justify-center items-center `} >
                   
        <div className={`lg:w-[34rem] h-[12rem] w-[18rem] lg:h-[18rem] bg-amber-50 flex dark:text-black justify-center items-center rounded-lg`}>Welcome to my website</div>
       <button type="button" onClick={ontest} className="text-black font-bold text-2xl relative -top-20 right-8 lg:-top-32 lg:right-8 cursor-pointer"><IoIosClose /></button>
    </div>)}
    </>)
//     return   ( <>
//    (<div className={`w-svw h-svh bg-blur flex justify-center items-center `} >
                   
//         <div className={`lg:w-[34rem] h-[12rem] w-[18rem] lg:h-[18rem] bg-amber-50 flex dark:text-black justify-center items-center rounded-lg`}>Welcome to my website</div>
//        <button type="button" onClick={ontest} className="text-black font-bold text-2xl relative right-8 -top-20 lg:-top-32 lg:right-8 cursor-pointer"><IoIosClose /></button>
//     </div>)
//     </>)
}

export default TimeOut
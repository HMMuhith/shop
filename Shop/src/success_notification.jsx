import React from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";

import { IoIosCloseCircle } from "react-icons/io";


const Success = ({result}) => {
   result='success'
  return (
    <>
    {!result && result==='success'?(<><div className='bg-blue-100 w-[22rem] animate-notify absolute right-20 top-24 '>
        <div className='ml-2 p-1 flex '>
            <div className='flex justify-center items-center text-green-500 text-xl dark:text-green-500'><IoIosCheckmarkCircle /></div>
            <div className='border border-zinc-100 ml-6'>
             <div className='font-bold text-emerald-800 dark:text-emerald-800'>Success</div>
            <div className='text black dark:text-black'>You signed in successfully</div>
           
              
            </div>
        </div>
    </div>
    </>):

    (<><div className='bg-red-100 w-[22rem] rounded animate-notify absolute right-20 top-24 '>
        <div className='ml-2 p-1 flex '>
            <div className='flex justify-center items-center  text-red-500 text-xl dark:text-red-500'><IoIosCloseCircle /></div>
            <div className='border border-zinc-100 ml-6'>
             <div className='font-bold text-red-800 dark:text-red-800'>Error</div>
            <div className='text black dark:text-black'>Failed attempt</div>
           
            </div>
        </div>
    </div></>)}
    </>
  )
}

export default Success
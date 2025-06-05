import React from 'react'
import { IoClose } from "react-icons/io5";

const Close = ({click}) => {
  return (
    <div>
        <button className='text-2xl text-black hover:bg-black ml-2  hover:text-red-800 rounded-full' onClick={click}><IoClose/></button>
    </div>
  )
}

export default Close
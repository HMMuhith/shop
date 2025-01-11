import React from 'react'
import { IoClose } from "react-icons/io5";

const Close = ({click}) => {
  return (
    <div>
        <button className='text-2xl text-white hover:bg-green-600 hover:text-red-800' onClick={click}><IoClose/></button>
    </div>
  )
}

export default Close
import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

const Hamburg = ({click}) => {
  
  return (
    <div>
        <button  onClick={click}>
        <GiHamburgerMenu />
        </button>
    </div>
  )
}

export default Hamburg
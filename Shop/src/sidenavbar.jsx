import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartIcon from './CartIcon'
import { useSelector } from 'react-redux'
import { Logout } from './authSlice'
import { useDispatch } from 'react-redux'
import Close from './Close'

const SideNavbar = () => {
  const [IsClose,setIsClose]=useState(false)
  const{userinfo}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
const logoutHandler=()=>{
dispatch(Logout(userinfo))
}
  return (
    <>
    <div className={IsClose?'sm:hidden':'fixed top-10 right-0 h-[31rem] lg:hidden sm:bg-slate-200 z-20'}>
   <div className='mt-2 lg:hidden'>
        <Close click={()=>{setIsClose(!IsClose)}} />
      </div>

<ul className='mt-2 sm:text-xs sm:flex sm:flex-col sm:justify-center sm:items-start  s:w-full sm:h-32'>

        {userinfo ?null :(
          <li className='lg:hidden  sm:py-1.5 sm:px-6 sm:hover:text-white' >
          <NavLink to='/signup' className={({isActive})=>!isActive?`text-black lg:hidden sm:hover:text-white text-md font-semibold font-poppins`:``} > Sign up</NavLink>
        </li>)}
        {userinfo ? null :(<li className='lg:hidden sm:py-1.5 sm:px-6' >
          <NavLink to='/login' className={({isActive})=>!isActive?`text-black lg:hidden sm:hover:text-white text-md font-semibold font-poppins`:``} > Log in</NavLink>
        </li>)}
        <li className='lg:hidden sm:hover:text-white sm:py-1.5 sm:px-6' >
          <NavLink to='/about' className={({isActive})=>!isActive?`text-black lg:hidden  text-md font-semibold font-poppins`:``} > About</NavLink>
        {/* </li>
        <li className=' lg:w-8 lg:h-10 sm:w-6 sm:h-8 lg:flex lg:justify-center sm:flex sm:justify-center  lg:items-center sm:items-center py-1.5 pl-9'>
        <CartIcon/> */}
        </li>
        <li className='py-1.5 pl-5'>
          <button type='button' className='text-black  lg:hidden hover:text-white text-md font-semibold font-poppins' onClick={logoutHandler}>Logout</button>
        </li>
       </ul> 
       </div>
    </>
  )
}

export default SideNavbar


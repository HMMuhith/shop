import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import CartIcon from './CartIcon'
import { useSelector } from 'react-redux'
import { Logout } from './authSlice'
import { useDispatch } from 'react-redux'
import Hamburg from './Hamburg'
import Close from './Close'
import { useLogoutMutation } from './usershopSlice'

const Navbar = () => {
  const [IsOpen,setIsOpen]=useState(true)
  const [LogOut]=useLogoutMutation()
  const{userinfo}=useSelector(state=>state.auth)
  console.log(userinfo)
  const dispatch=useDispatch()
const logoutHandler=async()=>{
  try {
    await LogOut().unwrap()
dispatch(Logout())

  } catch (error) {
    console.log(error) 
  }

// dispatch(Logout(userinfo))
}
// const toggleMenu=document.getElementById('hamburg')
// const sideleft=document.getElementById('sideleft')
// const bar=document.getElementById('bar')

// toggleMenu?.addEventListener('click',()=>{
//   toggleMenu.classList.toggle('translate-x-full')
//   bar.classList.toggle('translate-x-0')
  
// })

// sideleft?.addEventListener('click', ()=>{
//   bar.classList.toggle('translate-x-0')
// })

  return (
    <>
        <div id='hamburg' className='sm:mt-2 sm:mr-3 text-xl cursor-pointer active:text-white md:hidden lg:hidden'>
          <Hamburg click={()=>{setIsOpen(false)}} />
          
        </div>
    <ul className='lg:flex hidden lg:justify-around lg:items-center lg:h-10 ' >

        {userinfo ?null :(
          <li className='lg:block sm:hidden' >
          <NavLink to='/signup' className={({isActive})=>!isActive?`text-black hover:text-white text-md font-semibold font-poppins`:``} > Sign up</NavLink>
        </li>)}
        {userinfo ? <div className='text-black hover:text-white text-md font-semibold font-poppins cursor-pointer'>{userinfo.Name}</div>:(<li className='sm:hidden lg:flex hidden lg:justify-around lg:items-center lg:h-10 ' >
          <NavLink to='/login' className={({isActive})=>!isActive?`text-black hover:text-white lg:text-md lg:font-semibold lg:font-poppins`:``} > Log in</NavLink>
        </li>)}
        <li className='lg:block md:hidden sm:hidden' >
          <NavLink to='/about' className={({isActive})=>!isActive?`text-black hover:text-white text-md font-semibold font-poppins`:``} > About</NavLink>
        </li>
        <li className=' w-8 h-10 lg:flex justify-center sm:hidden items-center'>
        <NavLink to='/cart' ><CartIcon/></NavLink>
        </li>
       {userinfo? <li className=''>
          <button type='button' className='text-black sm:hidden lg:block hover:text-white text-md font-semibold font-poppins' onClick={logoutHandler}>Logout</button>
        </li> : null}
      
        
        
      </ul>
   
    
      <div id='bar'  className={IsOpen?'sm:hidden':'fixed top-8 right-0 h-[17rem] lg:hidden sm:bg-slate-800 rounded-s-md z-20 '}>
   <div id='sideleft' className='mt-2 lg:hidden'>
        <Close click={()=>{setIsOpen(!IsOpen)}} />
      </div>

<ul className='mt-2 sm:text-xs sm:flex sm:flex-col sm:justify-center lg:hidden sm:items-start  s:w-full sm:h-32'>

        {userinfo ?null :(
          <li className='lg:hidden  sm:py-1.5 sm:px-6 sm:hover:text-white' >
          <NavLink to='/signup' className={({isActive})=>!isActive?`text-blue-800 lg:hidden sm:hover:text-white text-md font-semibold font-poppins`:``} > Sign up</NavLink>
        </li>)}
        {userinfo ? null :(<li className='lg:hidden sm:py-1.5 sm:px-6' >
          <NavLink to='/login' className={({isActive})=>!isActive?`text-blue-800 lg:hidden sm:hover:text-white text-md font-semibold font-poppins`:``} > Log in</NavLink>
        </li>)}
        <li className='lg:hidden sm:hover:text-white sm:py-1.5 sm:px-6' >
          <NavLink to='/about' className={({isActive})=>!isActive?`text-blue-800 sm:hover:text-white lg:hidden  text-md font-semibold font-poppins`:``} > About</NavLink>
        {/* </li>
        <li className=' lg:w-8 lg:h-10 sm:w-6 sm:h-8 lg:flex lg:justify-center sm:flex sm:justify-center  lg:items-center sm:items-center py-1.5 pl-9'>
        <CartIcon/> */}
        </li>
        {userinfo?(<li className='py-1.5 pl-6'>
          <button type='button' className='text-blue-800  lg:hidden hover:text-white text-md font-semibold font-poppins' onClick={logoutHandler}>Logout</button>
        </li>) :null}
       </ul> 
       </div>
    

    </>
  )
}

export default Navbar


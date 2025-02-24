import React from 'react'
import Search from './Search';
import MoonIcon from './moonIcon';
import Navbar from './navbar'


const Header = () => {

  return (
    <>
      <div className='lg:bg-blue-600 lg:flex lg:justify-between lg:items-center lg:w-full lg:h-20 lg:border-2 lg:border-solid lg:border-sky-600   bg-blue-600 flex justify-between items-center w-full h-20 border-2 border-solid border-sky-600' >
        {/* {userinfo ? (<p> Hi! {userinfo?.Name}</p>) : null} */}
        <div className='lg:ml-3 ml-3'>
        <MoonIcon />
        </div>
        <div className='lg:w-[36rem] lg:ml-[17rem] sm:hidden lg:flex lg:items-center '>
          <Search />
        </div>
        <div className='lg:overflow-hidden lg:ml-[8rem] lg:w-[28rem]'>
          <Navbar />
        </div>
        
        {/* <div className='sm:mt-2 sm:mr-3 text-xl cursor-pointer active:text-white md:hidden lg:hidden'>
          <Hamburg click={()=>{setIsOpen(!IsOpen)}}/>
        </div>
        {IsOpen && <SideNavbar/>
       } */}
       
      </div>
   
      
    </>
  )
}
export default Header

import React from 'react'
import { NavLink } from 'react-router-dom'

const Checkout=({step1,step2,step3,step4})=> {
  return (
    <div className='lg:flex flex lg:justify-center justify-center '>
        <div className='lg:p-0.5 p-0.5'>
          {step1?
        (<NavLink to={'/login'} className='lg:font-semibold lg:text-sm text-xs'>Signin</NavLink>):
        (<NavLink  className='opacity-75 lg:opacity-75 font-medium text-sm lg:text-sm lg:font-medium'>Signin</NavLink>)}
        </div>

        <div className='lg:p-0.5 p-0.5'>

          {step2?(<NavLink to={'/shipping'} className='lg:font-semibold font-semibold text-xs lg:text-sm'>Shipping</NavLink>):(<NavLink  className='opacity-75 text-sm lg:text-sm lg:opacity-75 font-medium lg:font-medium'>Signup</NavLink>)}

        </div>

         
         <div className='lg:p-0.5 p-0.5'>

        {step3?(<NavLink to={'/payment'} className='lg:font-semibold font-semibold lg:text-sm text-xs'>Payment</NavLink>):(<NavLink  className='opacity-75 lg:opacity-75 text-sm lg:text-sm font-medium lg:font-medium'>Payment</NavLink>)}

        </div>

        <div className='lg:p-0.5 p-0.5'>

        {step4?(<NavLink to={'/order'} className='lg:font-semibold lg:text-sm font-semibold text-xs' >Placeorder</NavLink>):(<NavLink  className='opacity-75lg:text-sm text-sm lg:opacity-75 font-medium lg:font-medium'>Placeorder</NavLink>)}
        
        </div>

    </div>
  )
}

export default Checkout  
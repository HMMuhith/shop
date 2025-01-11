import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from 'react-redux';



const CartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const num = cartItems.reduce((a, c) => a + c.quantity, 0)
  return (
    <>
      <div className='flex items-center relative'>
        <span className='text-xl cursor-pointer text-black hover:text-white z-10 absolute'>
          <FiShoppingCart />
        </span>

        <span className='relative text-xs z-30  bg-red-700 outline-none font-bold  flex justify-center rounded-full text-white items-center w-4 ml-4 -mt-4'>{cartItems?.length > 0 ? num : 0} </span>

      </div>
    </>
  )
}
export default CartIcon

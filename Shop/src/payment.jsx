import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PaymentMethod } from './cartslice'
import Checkout from './checkout'
import { useNavigate } from 'react-router'

const Payment = () => {

  const [payment, setPayment] = useState(`PayPal`)
  const dispatch = useDispatch()
const navigate=useNavigate()
const {shipping}=useSelector(store=>store.cart)
  const submit = (e) => {
    e.preventDefault()
    dispatch(PaymentMethod(payment))
    navigate('/order')
    console.log(`dispatched`)
  }

useEffect(()=>{
  if(!shipping){
    navigate('/shipping')
  }
},[shipping,navigate])
  return (
    <>
      <div>
        <Checkout step1 step2 step3 />
      </div>
      <div className='mb-8 font-bold tracking-wide lg:text-2xl mt-2 ml-8 sm:ml-2 sm:text-lg font-poppins underline underline-offset-8 decoration-4 text-blue-600 dark:text-white decoration-black dark:decoration-blue-600'>Payment</div>

      <div className='grid place-items-center '>
            <div className='border border-slate-400 dark:border-none dark:bg-zinc-900 shadow-[1px_1px_14px_1px_rgba(0,0,0,0.1)] rounded mt-2.5 mb-20'>
               <div className='text-blue-700 font-semibold text-lg font-PT mt-3 mb-2 pl-3'>Select method</div>
                          <div>
                            <form action="" onSubmit={submit}>
                            <div className='pl-3'>
                              <input type="radio" name="" className='w-3.5 h-3.5 accent-sky-600' id="paypal" value="payment" onChange={(e) => {
                                setPayment(e.target.value)
                              }} checked />
                              <label htmlFor="paypal" className='font-medium ms-1.5 '>PayPal or Credit card</label>
                              </div>
                              <div className='mb-5 px-3'>
                              <button type="submit" className='mt-6 bg-black hover:bg-opacity-75 text-white font-bold py-1 px-16 cursor-pointer border-2 border-blue-700 rounded'>Continue</button>
                              </div>
                            </form>
                          </div>  
            </div>
      </div>
    </>
  )
}
export default Payment

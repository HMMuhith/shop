import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { ShippingAddress } from './cartslice'
import Checkout from './checkout'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
const dispatch=useDispatch()
const Navigate=useNavigate()
const {shipping}=useSelector((state=>state.cart))
    const [productshipping, setShipping] = useState({
        address: shipping?.address,
        city: shipping?.city,
        postalcode: shipping?.postalcode,
        country: shipping?.country
    })
const submit=(e)=>{
e.preventDefault()
dispatch(ShippingAddress({...productshipping}))
Navigate('/payment')
}
const changehandler=(e)=>{
    const name=e.target.name
const value=e.target.value
setShipping({...productshipping,[name]:value})
}


    return (
        <>
        <div >
        <Checkout step1 step2/>
        </div >
        <div className='font-bold tracking-wide text-xl mt-2 ml-8 font-poppins underline underline-offset-8 decoration-4 decoration-blue-600'>
            Shipping
            </div>
        <div className='flex justify-center items-center mt-[2.2rem]'>
                <form action="" className='border rounded border-slate-400 grid shadow-[1px_1px_14px_1px_rgba(0,0,0,0.1)] ' onSubmit={submit}>
                    <div className='grid place-content-center '>
                    <div className='mx-2' >
                        <input type="text" className='border border-slate-400 py-2 w-[33rem] mt-2 placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="address" placeholder='Address' onChange={changehandler} value={productshipping.address} />
                    </div><br />
                    <div className='mx-2'>
                        <input type="text" className='border border-slate-400 py-2 w-[33rem] mt-2 placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="city" placeholder='City' onChange={changehandler} value={productshipping.city} />
                    </div><br />
                    <div className='mx-2'>
                        <input type="text" className='border border-slate-400 py-2 w-[33rem] mt-2 placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="postalcode" placeholder='Postalcode' onChange={changehandler} value={productshipping.postalcode} />
                    </div><br />
                    <div className='mx-2'>
                        <input type="text" className='border border-slate-400 py-2 w-[33rem] mt-2 placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="country" placeholder='Country' onChange={changehandler} value={productshipping.country} />
                    </div><br />
                    <div className='place-self-center mb-10'>
                    <button type='submit' className='bg-black hover:bg-opacity-75 text-white font-bold py-1 px-28 cursor-pointer border border-blue-700 rounded'>
                        Submit
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Shipping

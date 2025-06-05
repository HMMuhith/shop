import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import TrashIcon from './TrashIcon'
import { RemoveCart } from './cartslice'
import { useDispatch } from 'react-redux'


const Cart = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { cartItems } = useSelector((state) => {
        return state.cart
    })
    const checkOutHandler=()=>{
navigate('/login?redirect=/shipping')
    }

    const RemoveHandler = (id) => {

        dispatch(RemoveCart(id))
    }
    return (
        <> <div className='lg:mt-10 sm:mt-5 lg:ml-6 sm:ml-3'>
            <h1 className='font-bold lg:text-3xl sm:text-lg font-IBM subpixel-antialiased underline  underline-offset-[12px] dark:text-white dark:decoration-blue-700 decoration-black lg:tracking-wider sm:tracking-normal leading-relaxed text-cyan-600'><strong>Shopping Details</strong></h1><br /><br />
        </div>
            <div>
                {cartItems?.length === 0 ? (<div className='border-zinc-200 shadow-[1px_1px_4px_1px_rgba(0,0,0,0.1)] border dark:border-none dark:bg-slate-900 text-red-700 font-poppins dark:rounded-lg flex justify-center items-center h-14 w-1/4 m-auto mb-28'>Your cart is empty</div>) :

                    <div className="lg:w-full lg:flex lg:justify-center lg:items-center lg:mx-6 sm:mx-2 sm:flex sm:justify-center sm:items-center sm:w-auto lg:overflow-x-hidden sm:overflow-x-hidden ">
                        <div className=' lg:w-[45rem] drop-shadow shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)] sm:w-auto'>
                            <table className="lg:w-full sm:w-auto  lg:border-spacing-0 sm:border-spacing-0 sm:border-b lg:border-b dark:border-none dark:rounded lg:text-sm sm:text-xs sm:text-left sm:rtl:text-right lg:text-left lg:rtl:text-right ">
                                <thead className="text-xs  text-center uppercase  ">
                                    <tr className='bg-sky-400 dark:text-black text-black border border-solid dark:border-none rounded border-separate'>
                                        <th scope="col" className="lg:px-2 sm:px-.5 lg:text-center lg:py-3 sm:py-0.5 sm:text-center sm:text-[8px] ">
                                            Product name
                                        </th>
                                        <th scope="col" className="lg:px-2 lg:text-center lg:py-3 sm:px-.5 sm:py-0.5 sm:text-center sm:text-[8px]">
                                            Image
                                        </th>
                                        <th scope="col" className="lg:px-2 lg:py-3 sm:px-.5 lg:text-center sm:py-0.5 sm:text-center sm:text-[8px]">
                                            Price
                                        </th>
                                        <th scope="col" className="lg:px-2 lg:py-3 sm:px-.5 sm:py-0.5 lg:text-center sm:text-center sm:text-[8px]">
                                            Quantity
                                        </th>
                                        <th scope="col" className="lg:px-2 lg:py-3 sm:px-.5 sm:py-0.5 lg:text-center sm:text-center sm:text-[8px]">
                                            Total Price
                                        </th>
                                        <th scope="col" className="lg:px-2 lg:py-3 sm:px-.5 sm:py-0.5 lg:text-center sm:text-center sm:text-[8px]">
                                            Remove
                                        </th>

                                    </tr>
                                </thead>
                                {cartItems?.map(item => {
                                    return <tbody className='text-center'>
                                        <tr className="rounded sm:text-[10px] lg:text-sm dark:border-none bg-stone-100 dark:bg-gray-900">

                                            <th key={item._id} scope="row" className="px-2 dark:text-white py-3 font-medium text-black whitespace-nowrap ">
                                                <Link to={`/product/${item._id}`} >{item.product_name}</Link>
                                            </th>

                                            <td key={item._id} className="px-2 flex justify-center items-center  py-3">
                                                <img key={item?._id} alt={item?.product_name} className='rounded-md  border-solid border-black' src={`/BackendImage/${item?.image}`} width='50px' />
                                            </td>

                                            <td key={item._id} className="px-2  py-3">
                                                <p className="font-medium text-blue-600 dark:text-blue-500 ">{item.price}</p>
                                            </td>

                                            <td key={item._id} className="px-2  py-3">
                                                <p className="font-medium text-blue-600 dark:text-blue-500 ">{item.quantity}</p>
                                            </td>

                                            <td key={item._id} className="px-2  py-3">
                                                <p className="font-medium text-blue-600 dark:text-blue-500 ">{item.quantity * item.price}</p>
                                            </td>

                                            <td key={item._id} className="px-2  py-3">
                                                <button className="font-medium text-red-700 "><TrashIcon change={(e) => {
                                                    e.preventDefault()
                                                    RemoveHandler(item._id)
                                                }} /></button>
                                            </td>
                                        </tr>

                                    </tbody>
                                })}
                            </table>
                        </div>
                    </div>
                }
            </div>
            {cartItems.length > 0 ? (
                <div className='lg:flex sm:flex sm:justify-center sm:items-center lg:justify-center lg:items-center lg:mt-14 sm:mt-14 lg:mb-10 sm:mb-10'>
                    <div className=' sm:w-auto sm:h-[7rem] lg:w-[26rem] lg:h-[7rem] drop-shadow-md lg:border lg:border-stone-200 dark:bg-zinc-900 dark:border-none shadow-lg bg-stone-100 rounded-lg  flex justify-center items-center'>
                        <div className=''>
                            <div className='flex justify-center items-center '>
                                <div className='lg:-mt-1.5 font-bold lg:text-xl sm:text-base sm:pl-2 font-poppins dark:text-white text-black'>Grand Total Price :</div>
                                <h2 className='lg:ml-1 lg:-mt-1.5 sm:text-base sm:pl-0.5 font-bold text-cyan-500 dark:text-cyan-500'>{cartItems.reduce((PrevPrice, CurrentPrice) => {
                                    return PrevPrice + CurrentPrice.price * CurrentPrice.quantity
                                }
                                    , 0)}
                                </h2> <strong className='lg:text-2xl sm:text-base sm:pr-1 font-bold lg:-mt-2.5 lg:ml-1 dark:text-amber-400'>৳</strong>
                            </div>
                                <div className='mt-1.5 ml-8'>
                                    <button type="button" onClick={checkOutHandler} className='lg:rounded-lg sm:rounded-xl dark:bg-pink-600 sm:text-sm sm:py-1 sm:px-1.5 bg-pink-600 lg:py-1 lg:px-1.5 text-white'>Proceed to checkout ➔</button>
                                </div>
                        </div>
                    </div>
                </div>
            ) : ''}

        </>
    )
}

export default Cart 
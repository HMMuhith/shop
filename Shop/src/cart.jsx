import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TrashIcon from './TrashIcon'
import { RemoveCart } from './cartslice'
import { useDispatch } from 'react-redux'


const Cart = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => {
        return state.cart
    })
    const RemoveHandler = (id) => {

        dispatch(RemoveCart(id))
    }
    return (
        <> <div className='mt-10 ml-6'>
            <h1 className='font-bold text-3xl font-IBM subpixel-antialiased underline underline-offset-[12px] decoration-black tracking-wider leading-relaxed text-cyan-600'><strong>Shopping Details</strong></h1><br /><br />
        </div>
            <div>
                {cartItems?.length === 0 ? (<div className='border-zinc-200 shadow-[1px_1px_4px_1px_rgba(0,0,0,0.1)] border flex justify-center items-center h-14 w-1/4 m-auto'>Your cart is empty</div>) :

                    <div className="w-full flex justify-center items-center mx-6  overflow-x-hidden sm:rounded-lg">
                        <div className=' w-[45rem] drop-shadow border-2 shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1)]'>
                            <table className="w-full  border-spacing-0 border-b text-sm text-left rtl:text-right ">
                                <thead className="text-xs  text-center uppercase  ">
                                    <tr className='bg-sky-400 border border-solid rounded border-separate'>
                                        <th scope="col" className="px-2 text-center py-3 rounded">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-2 text-center py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Total Price
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Remove
                                        </th>

                                    </tr>
                                </thead>
                                {cartItems?.map(item => {
                                    return <tbody className='text-center'>
                                        <tr className="rounded dark:border-gray-700">

                                            <th key={item._id} scope="row" className="px-2 py-3 font-medium text-black whitespace-nowrap ">
                                                <Link to={`/shop/product/${item._id}`} >{item.product_name}</Link>
                                            </th>

                                            <td key={item._id} className="px-2 flex justify-center items-center  py-3">
                                                <img key={item?._id} alt={item?.product_name} className='rounded-md  border-solid border-black' src={item && require(`./BackendImage/${item?.image}`)} width='50px' />
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
                                                <button className="font-medium text-black "><TrashIcon change={(e) => {
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
                <div className='flex justify-center items-center mt-14'>
                    <div className=' w-[26rem] h-[7rem] drop-shadow-md border border-black shadow-[2px_0px_5px_1px_rgba(0,0,0,0.1)] rounded-lg  flex justify-center items-center'>
                        <div className=''>
                            <div className='flex justify-center items-center '>
                                <div className='-mt-1.5 font-bold text-xl font-poppins'>Grand Total Price :</div>
                                <h2 className='ml-1 -mt-1 font-bold'>{cartItems.reduce((PrevPrice, CurrentPrice) => {
                                    return PrevPrice + CurrentPrice.price * CurrentPrice.quantity
                                }
                                    , 0)}
                                </h2> <strong className='text-2xl font-bold -mt-2'>৳</strong>
                            </div>
                                <div className='mt-1.5 ml-8'>
                                    <button type="button" className='rounded-lg dark:bg-pink-600 py-1 px-1.5 text-white'>Proceed to checkout ➔</button>
                                </div>
                        </div>
                    </div>
                </div>
            ) : ''}

        </>
    )
}

export default Cart 
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useGetOrderDetailsQuery, useGetPaypalClientIDQuery, useDeliverOrderMutation, usePayOrderMutation } from './ordershopSlice'
import { useSelector } from 'react-redux'
import Loader from './loader'
import Success from './success_notification'
import Fail from './fail_notification'
import axios from 'axios'

const Orderdetails = () => {
  const { orderID } = useParams()
  const { data: orders, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderID)
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const { data: paypal, isLoading: loadingPaypal, error: errorPaypal } = useGetPaypalClientIDQuery()
  const [DeliverOrder, { isLoading: loadingdeliver,isError:errloading }] = usePayOrderMutation()
  const { userinfo } = useSelector((state) => state.auth)
  const [status, setstatus] = useState({ type: '' })
  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.client_id) {
      const loadpaypalScript = async () => {
        paypalDispatch({
          type: `resetOptions`,
          value: {
            'client-id': paypal.client_id,
            currency: 'USD'
          }
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if (orders && !orders.isPaid) {
        if (!window.paypal) {
          loadpaypalScript()
        }
      }
    }
  }, [orders, paypal, paypalDispatch, loadingPaypal, errorPaypal])


const succesify=()=>{
  setTimeout(()=>{
   const message=document.getElementById('success')
   message?.remove()
  },4000
)
  }

  function failing(){
    setTimeout(()=>{
      const message=document.getElementById('fail')
      message?.remove()
    },3000)
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orders?.total_price
          }
        }
      ]
    }).then(orderID => { return orderID })
  }


  
  const onApprove = (data, actions) => {
   
    return actions.order.capture().then(async(details)=>{
      try {
        const request= await axios(`${import.meta.env.VITE_BACKEND_URL}/shop/order/${orderID}/deliver`,{
          method:'put',
       data:details
        })
        const data= await request.data
        console.log(data)
        refetch()
        setstatus({type:'success'})
      } catch (error) {
        console.log(error?.data?.message || error?.message)
            setstatus({ type: 'fail' })
      }
     })
 
    
  }
  
  const onApprovetest = async () => {

    try {
     const request=await axios(`${import.meta.env.VITE_BACKEND_URL}/shop/order/${orderID}/delivery`,{
      method:'put',
      
     })
     console.log(request)
      refetch()
      

    }
    catch (err) {
      console.log(err?.data?.message || err?.message)
      
    }
  }
  const paypalError = () => {
    console.log(errloading)
    setstatus({ type: 'fail' })
  }
  return (
    <>
      <p className='lg:my-4 sm:my-4 sm:ml-1 lg:ml-4 lg:flex sm:flex sm:justify-center sm:items-center lg:justify-center lg:items-center'>
        <p className='font-bold text-xl'>Order : </p><strong className='text-xl pl-1 text-blue-700'>{orders && orders._id}</strong>
      </p>

      <div className='lg:flex lg:flex-row sm:flex sm:flex-col lg:justify-center lg:border dark:border-none  sm:justify-center lg:items-center sm:items-start lg:w-full sm:w-full sm:h-[40rem] lg:h-auto '>
        <div className='lg:grid sm:flex sm:flex-col sm:m-4 sm:justify-center sm:items-center sm:gap-1 lg:gap-3  lg:grid-cols-3 sm:w-11/12 lg:w-3/4 sm:my-2 lg:my-6'>

          <div className='rounded w-11/12 lg:border-t border dark:border-none dark:bg-slate-900 lg:border-r lg:border-l lg:col-span-2 '>
            <div className='font-bold   lg:pb-2  lg:font-bold text-[16px] pt-2 pb-3 pl-2 lg:text-lg lg:pl-2'>Shipping</div>
            <div className='lg:flex flex '><p className='lg:pl-2 lg:text-base pb-1 pt-3 text-blue-600 lg:text-blue-600 text-[13px] pl-2 font-medium lg:font-medium'>Name :</p>
              <p className='text-[13px] lg:text-sm pb-2 sm:pt-3 lg:pt-4 pl-2'>{orders?.user.Name}</p>
            </div>
            <div className='lg:flex flex '><p className='lg:pl-2 lg:text-base  text-blue-600 lg:text-blue-600 text-[13px] pt-1 pb-2 pl-2 font-medium lg:font-medium'>Email :</p>
              <p className='text-[13px] lg:text-sm pb-2 sm:pt-1 lg:pt-1.5 pl-2'>{orders?.user.email}</p>
            </div>
            <div className='lg:flex flex '><p className='lg:pl-2 lg:text-base  text-blue-600 lg:text-blue-600 text-[13px] pt-1 pb-2 pl-2 font-medium lg:font-medium'>Address :</p>
              <p className='text-[13px] lg:text-sm pb-4 sm:pt-1 lg:pt-2.5 pl-2'>{orders?.shipping.address},{orders?.shipping.city},{orders?.shipping.country}</p>
            </div>
            {
              orders?.isDelivered === false ?
                <div className='bg-red-200 lg:mx-2 lg:h-9 rounded flex justify-center font-PT items-center text-red-800 mb-3 '>Not Delivered</div> : <div className='bg-green-300 mb-3 rounded lg:mx-2 flex justify-center items-center lg:h-9 font-PT text-emerald-900 font-extrabold '>{`Delivered on ${orders?.deliveredAt?.substring(0, 10)}`}</div>
            }
          </div>

          <div className='lg:border sm:border sm:border-slate-300 sm:mt-3 dark:border-none dark:bg-slate-900 rounded w-11/12 lg:border-b-2 lg:border-slate-200 lg:col-span-2 '>
            <div className='lg:font-bold font-bold text-[16px] lg:text-lg py-1 pl-2 lg:pb-2 lg:pl-2'>Payment</div>
            <div className='lg:flex flex'><p className='lg:text-base py-1 pl-2 text-[13px] text-blue-600 lg:text-blue-600 font-medium lg:font-medium lg:pl-2'>Method :</p>
              <p className='text-[13px] lg:text-base pl-2 pt-1 pb-3'>{orders?.payment_method}</p>
            </div>
            {
              orders?.isPaid === false ?
                <div className='bg-red-200 lg:mx-2 lg:h-9 rounded flex justify-center font-PT items-center text-red-800 mb-3'>Not Paid</div> : <div className='bg-green-300 mb-3 lg:mx-2 flex justify-center items-center rounded lg:h-9 font-PT text-emerald-900 font-extrabold '>{`Paid on ${orders?.paidAt?.substring(0, 10)}`}</div>
            }
          </div>

          <div className='rounded w-11/12 dark:border-none dark:bg-slate-900 lg:pb-2 mt-2 lg:mt-0 lg:border dark:lg:bg-slate-900 dark:lg:text-white dark:text-black flex flex-col justify-center items-center lg:border-slate-200 lg:col-span-2 lg:row-start-3 '>

            <div className='lg:flex sm:flex lg:justify-center sm:justify-center lg:items-center sm:items-center sm:font-bold lg:font-bold sm:text-lg sm:dark:text-white lg:text-lg'>Order Items</div>

            <div className='lg:flex lg:w-full lg:pb-2 pb-2 w-full flex lg:border-none'>
              <div className='lg:w-full sm:w-full'>
                {orders?.orderItems.length === 0 ? <div className='flex justify-center items-center'><p className=' w-3/4 border border-zinc-200 dark:border-none flex justify-center items-center text-red-700 font-medium'>Your cart is empty</p></div> :
                  orders?.orderItems.map((item) =>
                    <>
                      <table className='lg:w-full w-full'>
                        <tbody className='lg:border-none lg:border'>
                          <tr className='sm:dark:text-white'>
                            <td key={item._id} className=" sm:w-[3rem] lg:w-[5.5rem]">
                              <div className='lg:flex sm:flex sm:w-[2.5rem] lg:w-[5rem] sm:ml-0.5 lg:border-none lg:justify-center sm:justify-center sm:items-center lg:items-center'>
                                <img key={item?._id} className='lg:rounded-md w-full sm:ml-1.5 lg:w-[3.5rem] sm:rounded-md' src={`/BackendImage/${item?.image}`} />
                              </div>
                            </td>
                            <td className='lg:w-48 w-[6.5rem] lg:border-none '>
                              <div className='lg:flex flex lg:justify-center justify-start items-center lg:items-center'>
                                <Link to={`/product/${item._id}`}><h1 className='lg:font-bold pl-2 lg:pb-0.5 lg:text-sm font-bold text-[10px]'>{item.product_name}</h1></Link>
                              </div>
                            </td>

                            <td className='w-4/12 '><div className='lg:flex flex w-[6.15rem] justify-start lg:w-[9.7rem] lg:justify-start items-center lg:items-center ml-1 lg:ml-3'><strong className=' lg:text-sm text-[10px] lg:font-poppins'>Amount : </strong><p className='lg:font-semibold font-semibold pl-2 lg:text-sm text-[10px]'>{item.quantity}×{item.price}</p></div></td>

                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
              </div>
            </div>
          </div>
          <div className='sm:rounded lg:w-[20rem] sm:w-3/5 sm:h-[10.5rem] lg:h-[13rem] sm:mb-3 sm:mt-7 lg:mb-0 mt-2 lg:mt-0  lg:ml-1 lg:col-start-3 dark:bg-slate-900 dark:text-white dark:lg:bg-slate-900 dark:lg:text-white dark:border-none lg:row-end-4 lg:row-start-1 flex lg:flex justify-center lg:justify-center items-center lg:items-center lg:border-2 lg:border-slate-200  lg:rounded'>
            <div className='lg:h-[15rem] w-[13rem] h-[9rem]  lg:flex flex justify-center lg:justify-center items-center lg:items-center'>
              <div className=''>
                <div><p className='lg:text-center text-center lg:ml-3 ml-3 lg:mb-3 lg:font-bold font-bold text-base lg:text-lg'>Order Summary</p></div>
                <div className='lg:bmt-3 bmt-3'>

                  <table>
                    <tbody>
                      <tr>
                        <td className='lg:px-1.5 px-1'><p className='lg:font-medium font-medium text-sm lg:text-base'>Items Price :</p></td>
                        <td className='lg:px-1 px-2 text-sm lg:text-base font-medium lg:font-medium'>{orders?.items_price}</td>
                      </tr>
                      <tr>
                        <td className='lg:px-1.5 px-1'><p className='lg:font-medium lg:text-base text-sm font-medium'>Shipping Price : </p></td>
                        <td className='lg:px-1 px-2 text-sm lg:text-base font-medium lg:font-medium'>{orders?.delivery_price}</td>
                      </tr>
                      <tr>
                        <td className='lg:px-1.5 px-1'><p className='lg:font-medium text-sm lg:text-base font-medium'>Tax Price : </p></td>
                        <td className='lg:px-1 px-2  lg:text-base text-sm lg:font-medium font-medium'>{orders?.tax_price}</td>
                      </tr>
                      <tr>
                        <td className='lg:px-1.5 px-1 font-bold lg:font-bold'><strong>Total Price : </strong></td>
                        <td className='lg:px-1 px-2 lg:font-bold font-bold dark:text-cyan-400 text-cyan-400 lg:text-cyan-400'>{`${orders?.total_price} ৳`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {!orders?.isDelivered && (
                  <>
                    {loadingdeliver && <Loader />}
                    
                    {isPending  ? <Loader /> :
                      userinfo.isAdmin &&(<div className='lg:flex flex justify-center lg:justify-center items-center lg:items-center mt-1.5 lg:mt-4 ml-0.5 lg:ml-2.5'>
                        <button type="button" onClick={onApprovetest} className='lg:text-white text-white bg-blue-700 lg:bg-blue-700 hover:bg-opacity-75 lg:hover:bg-opacity-75 focus:ring-4 lg:focus:ring-4 focus:ring-blue-300 lg:focus:ring-blue-300 font-medium lg:font-medium rounded lg:rounded text-sm lg:text-sm lg:px-5 px-3 lg:py-1.5 py-1.5 lg:me-2 me-2 lg:mb-2 mb-2 lg:focus:outline-none focus:outline-none ' >Mark as Delivered</button>
                      </div>)
                    }
                  
                  </>
                )
                }
              </div>

            </div>


          </div>

        </div>
      </div>

      {orders?.isPaid===false && (<div className='w-80 m-auto border dark:border-none dark:bg-slate-900 dark:rounded border-slate-200 h-auto flex justify-center items-center mt-7 '>

        <PayPalButtons style={{height:40}} className='w-72 p-6' onError={paypalError} createOrder={createOrder} onApprove={onApprove} />

      </div>)}
      {status.type === 'success' && <div id='success'> <Success message={`Payment  completed successfully`} /> </div>}
      {status.type==='success' && succesify()}
      {status.type === 'fail' && <div id="fail"><Fail message={`Something went wrong .Try again`} /></div>}
      {status.type==='fail' && failing()}
    </>
  )
}

export default Orderdetails
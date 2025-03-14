import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
import { PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useGetOrderDetailsQuery,useGetPaypalClientIDQuery,useDeliverOrderMutation } from './ordershopSlice'
import { useSelector } from 'react-redux'

const Orderdetails = () => {
    const {orderID}=useParams()
    const {data:orders,refetch,isLoading,isError}=useGetOrderDetailsQuery(orderID)
    const[{isPending},paypaldispatch]=usePayPalScriptReducer()
    const {data:paypal,isLoading:loadingPaypal,error:errorPaypal}=useGetPaypalClientIDQuery()
    const [DeliverOrder]=useDeliverOrderMutation()
    const {userinfo}=useSelector((state)=>state.auth)
    useEffect(()=>{
        if(!errorPaypal && !loadingPaypal && paypal.clientId){
          const loadpaypalScript=async()=>{
            paypaldispatch({
              type:`resetoptions`,
              value:{
                'clientId':paypal.clientId,
                currency:'USD'
              }
            })
            paypaldispatch({type:'setLoadingStatus',value:'pending'})
          }
          if(orders && !orders.isPaid){
            if(!window.paypal){
              loadpaypalScript()
            }
          }
        }
    },[orders,paypal,paypaldispatch,loadingPaypal,errorPaypal])


    console.log(orders)
const deliverHandler=async()=>{
  try {
    await DeliverOrder(orderID)
    refetch()
  } catch (error) {
    
  }
}
const createOrder=()=>{

}
const onApprovetest=(data,actions)=>{

}

const Approve=()=>{

}
const paypalError=()=>{

}
  return (
    <>
<p className='my-4 ml-4 flex justify-center items-center'>  
    <p className='font-bold text-xl'>Order : </p><strong className='text-xl pl-1 text-blue-700'>{ orders && orders._id }</strong>
</p>
 <div className='lg:flex lg:flex-row flex flex-col  lg:justify-center lg:border  justify-center lg:items-center items-start lg:w-full w-full h-[40rem] lg:h-auto '>
          <div className='lg:grid flex flex-col justify-center items-center gap-1 lg:gap-3  lg:grid-cols-3 w-11/12 lg:w-3/4 my-2 lg:my-6'>

            <div className='rounded w-11/12 lg:border-t border lg:border-r lg:border-l lg:col-span-2 '>
              <div className='font-bold   lg:pb-2  lg:font-bold text-[16px] pt-2 pb-3 pl-2 lg:text-lg lg:pl-2'>Shipping</div>
              <div className='lg:flex flex '><p className='lg:pl-2 lg:text-base pb-1 pt-3 text-blue-600 lg:text-blue-600 text-[13px] pl-2 font-medium lg:font-medium'>Name :</p>
                <p className='text-[13px] lg:text-sm pb-2 pt-4 pl-2'>{orders?.user.Name}</p>
              </div>
              <div className='lg:flex flex '><p className='lg:pl-2 lg:text-base  text-blue-600 lg:text-blue-600 text-[13px] pt-1 pb-2 pl-2 font-medium lg:font-medium'>Email :</p>
                <p className='text-[13px] lg:text-sm pb-2 pt-4 pl-2'>{orders?.user.email}</p>
              </div>
              <div className='lg:flex flex '><p className='lg:pl-2 lg:text-base  text-blue-600 lg:text-blue-600 text-[13px] pt-1 pb-2 pl-2 font-medium lg:font-medium'>Address :</p>
                <p className='text-[13px] lg:text-sm pb-2 pt-4 pl-2'>{orders?.shipping.address},{orders?.shipping.city},{orders?.shipping.country}</p>
              </div>
                {
                orders?.isDelivered===false?
                <div className='bg-red-200 lg:mx-2 lg:h-9 rounded flex justify-center font-PT items-center text-red-800'>Not Delivered</div>: <div className='bg-green-300 lg:mx-2 flex justify-center items-center lg:h-9 font-PT text-emerald-700'>{`Delivered on ${orders?.deliveredAt?.substring(0,10)}`}</div> 
                }
            </div>

            <div className='lg:border  rounded w-11/12 lg:border-b-2 lg:border-slate-200 lg:col-span-2 '>
              <div className='lg:font-bold font-bold text-[16px] lg:text-lg py-1 pl-2 lg:pb-2 lg:pl-2'>Payment</div>
              <div className='lg:flex flex'><p className='lg:text-base py-1 pl-2 text-[13px] text-blue-600 lg:text-blue-600 font-medium lg:font-medium lg:pl-2'>Method :</p>
                <p className='text-[13px] lg:text-base pl-2 py-1'>{orders?.payment_method}</p>
              </div>
              {
                orders?.isPaid===false?
                <div className='bg-red-200 lg:mx-2 lg:h-9 rounded flex justify-center font-PT items-center text-red-800'>Not Paid</div>: <div className='bg-green-300 lg:mx-2 flex justify-center items-center lg:h-9 font-PT text-emerald-700'>{`Paid on ${orders?.paidAt?.substring(0,10)}`}</div> 
                }
            </div>

            <div className='rounded w-11/12 lg:pb-2 mt-2 lg:mt-0 lg:border dark:lg:bg-white dark:bg-white dark:lg:text-black dark:text-black flex flex-col justify-center items-center lg:border-slate-200 lg:col-span-2 lg:row-start-3 '>

              <div className='lg:flex flex lg:justify-center justify-center lg:items-center items-center font-bold lg:font-bold text-lg lg:text-lg'>Order Items</div>

              <div className='lg:flex lg:w-full lg:pb-2 pb-2 w-full flex lg:border-none'>
                <div className='lg:w-full w-full'>
                  {orders?.orderItems.length === 0 ? <div className='flex justify-center items-center'><p className=' w-3/4 border border-zinc-200 flex justify-center items-center text-red-700 font-medium'>Your cart is empty</p></div> :
                    orders?.orderItems.map((item) =>
                      <>
                        <table className='lg:w-full w-full'>
                          <tbody className='lg:border-none lg:border'>
                            <tr className=''>
                              <td key={item._id} className=" w-[3rem] lg:w-[5.5rem]">
                                <div className='lg:flex flex w-[2.5rem] lg:w-[5rem] ml-0.5 lg:border-none lg:justify-center justify-center items-center lg:items-center'>
                                  <img key={item?._id} className='lg:rounded-md w-full  lg:w-[3.5rem] rounded-md' src={`/BackendImage/${item?.image}`} />
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
            <div className='rounded lg:w-[20rem] w-3/5 h-[10.5rem] lg:h-[13rem] mb-3 lg:mb-0 mt-2 lg:mt-0  lg:ml-1 lg:col-start-3 dark:bg-white dark:text-black dark:lg:bg-white dark:lg:text-black lg:row-end-4 lg:row-start-1 flex lg:flex justify-center lg:justify-center items-center lg:items-center lg:border-2 lg:border-slate-200  lg:rounded'>
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
                          <td className='lg:px-1 px-2 lg:font-bold font-bold text-emerald-900 lg:text-emerald-900'>{`${orders?.total_price}৳`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  { userinfo && userinfo.isAdmin &&  !orders?.isPaid && !orders?.isDelivered &&
                  (
                  <div className='lg:flex flex justify-center lg:justify-center items-center lg:items-center mt-1.5 lg:mt-4 ml-0.5 lg:ml-2.5'>
                    <button type="button" onClick={deliverHandler} className='lg:text-white text-white bg-blue-700 lg:bg-blue-700 hover:bg-opacity-75 lg:hover:bg-opacity-75 focus:ring-4 lg:focus:ring-4 focus:ring-blue-300 lg:focus:ring-blue-300 font-medium lg:font-medium rounded lg:rounded text-sm lg:text-sm lg:px-5 px-3 lg:py-1.5 py-1.5 lg:me-2 me-2 lg:mb-2 mb-2 lg:focus:outline-none focus:outline-none ' >Mark as Delivered</button>
                  </div>
                  )
                  }
                </div>
                  
              </div>


            </div>

          </div>
        </div>

    <div className='border border-green-600 h-28 '>

      <PayPalButtons style={{layout:`horizontal`}} className='pl-[19rem] pt-5' createOrder={createOrder} onApprove={Approve} onClick={paypalError} />

    </div>
    </>
  )
}

export default Orderdetails
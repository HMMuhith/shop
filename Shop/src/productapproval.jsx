import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDeleteProductMutation } from './productshopSlice'
import { useNavigate } from 'react-router'

const ProductApproval = () => {
    const {userinfo}=useSelector(state=>state.auth)
    const [DeleteItem]=useDeleteProductMutation()
    const [Data,setData]=useState()
const Navigate=useNavigate()
 useEffect(()=>{
if(userinfo.isAdmin===true){
    const Request=async()=>{
                const AllProducts= await fetch(`${VITE_BACKEND_URL}/shop/product/productsapproval`,{
                    method:'get',
                    headers:{
                        'Authorization':`${userinfo.token}`
                    }
                })
                const data=await AllProducts.json()
                setData(data)
                console.log(data)
    }

    Request()
}
    },[userinfo.isAdmin,userinfo.token])

    const Delete=async(productID)=>{
       
        if(window.confirm(`Are you want to delete the product?`)){
        try {
            
            await DeleteItem(productID)
           Navigate(0)
        } catch (error) {
            console.log(error)
        }}
    } 
     
  return (
    <>
    <div className='m-7'>
<h1 className='font-bold text-3xl font-IBM underline underline-offset-[12px] decoration-black tracking-wider leading-relaxed text-cyan-600'>Products Corner</h1>
    </div>
    <div className='mt-24 flex justify-center items-center'>
     <table className='w-11/12'>
            <thead className='border border-zinc-600'>
                <tr className='flex'>
                    <th className='border border-zinc-600 w-56'>ID</th>
                    <th className='w-64 border border-zinc-600'>Product</th>
                    <th className='w-[26rem] border border-zinc-600'>Description</th>
                    <th className='w-24 border border-zinc-600'>Price</th>
                    <th className='w-64 border border-zinc-600'>Request</th>
                </tr>
            </thead>
            <tbody className='border border-zinc-600'>
            {
              Data?.map(products=>
                {
                    return (
                          <>
                    
                        <div className='flex '>
                            <tr>
                                <div className='flex justify-center items-center'> 
                                        <td className='w-56 border border-zinc-600 flex justify-between py-2 pl-2 items-center'>{products._id}</td>
                                        
                                        <td className='w-64 flex border border-zinc-600 py-2 pl-2 justify-center items-center'>{products.product_name}</td>
                                        
                                        <td className='w-[26rem] flex justify-start items-center border border-zinc-600 py-2 pl-2'>{products.description}</td>
                                       
                                        <td className='w-24 border border-zinc-600 flex justify-center items-center  py-2 pl-2'>{products.price}</td>
                                        <td className='w-64 py-2 p-2 flex justify-center border border-zinc-600 items-center'>
                                                 
                                                    <button className='bg-green-600 w-20 text-white rounded text-sm mr-2'>Approve</button>
                                                    <button className='bg-red-600 w-20 text-white rounded text-sm' onClick={()=>Delete(products._id)}>Decline</button>
                                                
                                        </td>
                                </div>
                            </tr>
                        </div>
                    
                    
                    </>
                    )
                    })
                    }
             </tbody>
    </table>
   </div>
    </>
  )
}

export default ProductApproval  
import React, { useState } from 'react'
import { useProductDetailsMutation } from './productshopSlice'
import { useNavigate } from 'react-router'

const Seller = () => {
    const [product, {error}] = useProductDetailsMutation()
    const [image, setImage] = useState()
const navigate=useNavigate()
    const [PRODUCT, SETPRODUCT] = useState({
        product_name: '',
        image,
        description: '',
        price: '',
        stock: ''
    })
    const onchangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        SETPRODUCT({ ...PRODUCT, [name]: value })
    }
  
    const sendRequest = async (e) => {
        e.preventDefault()
        let formdata = new FormData()
        formdata?.append('product_name', PRODUCT.product_name)
        formdata?.append('image', image)
        formdata?.append('description', PRODUCT.description)
        formdata?.append('price', PRODUCT.price)
        formdata?.append('stock', PRODUCT.stock)  
        try {
            const item = await product(formdata)
            console.log(item)
            // navigate('/')
        }
        catch (err) {
            console.log(err?.data?.message || error?.data?.message)
        }
    }
     
    return (
        <div className='flex justify-center items-center mt-[2.2rem]'>
            <form action="" className='border rounded border-slate-400 grid shadow-[1px_1px_14px_1px_rgba(0,0,0,0.1)]' encType="multipart/form-data" >
            <div className='grid place-content-center '>
                <div  className='mx-2'>
                    <input className='border border-slate-400 py-2 w-[33rem] mt-2 placeholder:pl-2 placeholder:text-blue-300 pl-2  rounded' type="text" name="product_name" onChange={onchangeHandler} placeholder='Product Name' value={PRODUCT.product_name} id="" />
                </div><br /><br />
                <div className='ml-2'>

                    <input type="file" className='file:bg-zinc-700 file:hover:bg-opacity-75 file:rounded-md file:font-poppins file:border file:border-blue-700  file:py-1 file:px-3 file:cursor-pointer file:font-semibold file:text-blue-700' name="image" onChange={(e)=>{ console.log(e.target.files[0]) 
                        setImage(e.target.files[0])}} id="" />
                </div><br /><br />
                <div className='mx-2'>
                    <textarea className='border border-slate-400 py-2 w-[33rem] resize-none placeholder:pl-2 placeholder:text-blue-300 pl-2  rounded' name="description" id="" onChange={onchangeHandler} value={PRODUCT.description} cols="30" placeholder='Description' rows="3"></textarea>
                </div><br /><br />
                <div className='mx-2'>
                    <input type="text" className='border border-slate-400 py-2 w-[33rem] placeholder:pl-2 placeholder:text-blue-300 pl-2  rounded' name="price" id="" onChange={onchangeHandler}  value={PRODUCT.price} placeholder='Price' />
                </div><br /><br />
                <div className='mx-2'>
                    <input type="number" className='border border-slate-400 outline-none py-2 w-[33rem] placeholder:pl-2 placeholder:text-blue-300 pl-2  rounded' name="stock" onChange={onchangeHandler} id="" placeholder='Stock' value={PRODUCT.stock} />
                </div><br /><br />
                <div className='place-self-center mb-10'>
                    <input type="submit" className='bg-black hover:bg-opacity-75 text-white font-bold py-1 px-28 cursor-pointer border border-blue-700 rounded' onClick={sendRequest} value="Add Product" />
                </div>
                </div>
            </form>
        </div>
    )
}

export default Seller  
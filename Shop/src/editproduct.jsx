import React, { useEffect, useState } from 'react'
import { useGetProductsDetailsQuery } from './productshopSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditProduct = () => {
    const { productID } = useParams()
    const { data} = useGetProductsDetailsQuery(productID)
    // const [updateproduct]=useUpdateProductMutation()
    const navigate = useNavigate()
    const [image, setImage] = useState()
    const [product_name, setproduct_name] = useState()
    const [description, setdescription] = useState()
    const [price, setprice] = useState()
    const [stock, setstock] = useState()
console.log(data)
    useEffect(() => {
        if (data) {
            setproduct_name(data.product_name)
            setImage(data.image)
            setdescription(data.description)
            setprice(data.price)
            setstock(data.stock)
        }
    }, [data])
    const sendRequest = async (e) => {
        e.preventDefault()
        let formdata = new FormData()
        // formdata?.append('productID',productID)
        formdata?.append('product_name', product_name)
        formdata?.append('image', image)
        formdata?.append('description', description)
        formdata?.append('price', price)
        formdata?.append('stock', stock)
        console.log(formdata)
        try {
            // const item = await updateproduct(formdata,productID)
            // const item=await axios.put(`${VITE_BACKEND_URL}/shop/product/${productID}`,formdata)
            const item = await fetch(`${VITE_BACKEND_URL}/shop/product/${productID}`, {
                method: 'PUT',
                body: formdata
            })
            const result = await item.json()
            console.log(result)
            navigate('/')

        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <div className='font-bold tracking-wide text-xl mt-2 ml-8 font-poppins underline underline-offset-8 decoration-4 decoration-blue-600'>
Edit Product
        </div>
        <div className='flex justify-center items-center mt-[2.2rem]'>
            <form action="" spellCheck='false' className='border rounded dark:border-none dark:bg-zinc-800 border-slate-400 grid shadow-[1px_1px_14px_1px_rgba(0,0,0,0.1)] ' encType="multipart/form-data" >
                <div className='grid place-content-center '>
                    <input type="hidden" name="productID" value={productID} />
                    <div className='mx-2'>
                        <input className='border border-slate-400 py-2 w-[33rem] mt-6 dark:bg-zinc-600 dark:border-none dark:placeholder:text-white dark:placeholder:opacity-50 placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' type="text" name="product_name" onChange={(e) => { setproduct_name(e.target.value) }} placeholder='Product Name' value={product_name} id="" />
                    </div><br /><br />
                    <div className='ml-2'>

                        <input type="file" name="image" className='file:bg-zinc-700 file:hover:bg-opacity-75 file:rounded-md file:font-poppins file:border file:border-blue-700  file:py-1 file:px-3 file:cursor-pointer file:font-semibold file:text-blue-700' onChange={(e) => {
                            console.log(e.target.files[0])
                            setImage(e.target.files[0])
                        }} id="" />
                    </div><br /><br />
                    <div className='mx-2'>
                        <textarea className='border dark:bg-zinc-600 dark:border-none dark:placeholder:text-white dark:placeholder:opacity-50 border-slate-400 py-2 w-[33rem] resize-none placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="description" id="" onChange={(e) => { setdescription(e.target.value) }} placeholder='Description' value={description} cols="30" rows="3"></textarea>
                    </div><br /><br />
                    <div className='mx-2'>
                        <input type="text" className='dark:bg-zinc-600 dark:border-none dark:placeholder:text-white dark:placeholder:opacity-50 border border-slate-400 py-2 w-[33rem] placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="price" id="" onChange={(e) => { setprice(e.target.value) }} value={price} placeholder='Price' />
                    </div><br /><br />
                    <div className='mx-2'>
                        <input type="number" className='dark:bg-zinc-600 dark:border-none dark:placeholder:text-white dark:placeholder:opacity-50 border border-slate-400 outline-none py-2 w-[33rem] placeholder:pl-2 placeholder:text-blue-400 pl-2  rounded' name="stock" onChange={(e) => { setstock(e.target.value) }} id="" value={stock} placeholder='Stock' />
                    </div><br /><br />
                    <div className='place-self-center mb-10'>
                        <input type="submit" className='bg-black hover:bg-opacity-75 text-white font-bold py-1 px-28 cursor-pointer border dark:bg-blue-600 border-blue-700 rounded' onClick={sendRequest} value="Update" />
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditProduct
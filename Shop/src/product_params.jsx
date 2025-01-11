import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductsDetailsQuery } from './productshopSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AddCart } from './cartslice'
import Title from './title'
import Loader from './loader'
import { IoIosStar } from "react-icons/io";

const ProductParams = () => {
    const {userinfo}=useSelector(state=>state.auth)
    const navigate = useNavigate()
    const [quantity, setquantity] = useState(1)
    const [rating, setrating] = useState()
    const [comment, setcomment] = useState()
    const { productID } = useParams()
    const { data,isLoading,error } = useGetProductsDetailsQuery(productID)
    const [DeleteItem] = useDeleteProductMutation()
   const dispatch = useDispatch()

    const handler = (e) => {
        setquantity(Number(e.target.value))
    }
    console.log(data)

    const handleAddToCart = (e) => {
        e.preventDefault()
        dispatch(AddCart({ ...data, quantity }))
    }
    const deletehandler = async () => {
        if (window.confirm(`Are you sure you want to delete product?`)) {
            try {
                const deleteproduct = await DeleteItem(productID)
                console.log(deleteproduct, `Deleted successfully`)
                navigate('/')
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    const submit = async (e) => {
        e.preventDefault()
        try {
            const review = {
                productID,
                rating,
                comment
            }
           const response=await fetch(`${VITE_BACKEND_URL}/shop/product/${productID}/reviews`,{
                method:'POST',
                body:JSON.stringify(review),
                headers:{
                    'Content-Type':'application/json',
            'Authorization':`${userinfo.token}`
                }
            })
            const data=await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }  
    }
    return ( 
        <>
            <Title title={data?.product_name} description={data?.description} />

           { isLoading? <Loader/> : error? (
            <div>{error?.data?.message|| error.error}</div>
           )
           : <div className='rounded grid grid-cols-8 w-[70rem] ml-32 mt-7'>

                <div className='shrink col-span-4 bg-cover border border-zinc-300 flex justify-center items-center rounded'>
                    <img key={data?._id} src={data && `/BackendImage/${data?.image}`} alt=""  className='bg-slate-800 object-center bg-blend-darken hover:bg-red-700' />

                </div>
                <div className='grid grid-rows-3 h-[19rem] col-start-9 rounded'>
                                        <div className='text-2xl mt-3 font-bold text-blue-900 block font-poppins ' >
                                            <p className='text-center'>{data?.product_name}</p>
                                        </div>
                                        <div className='text-xl mt-1.5 font-semibold  block font-poppins ' >
                                            <p className='text-center'>{data?.description}</p>
                                        </div>
                                 <div>
                                <div className='flex justify-center h-[2rem]'>
                                                    <div>
                                                        <p className='font-medium'>Quantity</p>
                                                    </div>
                                                    <div className='mx-4 rounded'>
                                                        {data?.stock > 0 && (<select className='bg-slate-800 font-extralight text-xs text-white rounded' value={quantity} onChange={handler} >{[...Array(data?.stock).keys()].map((x) => {

                                                            return <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        })}</select>)}
                                                    </div>
                                </div>
                            <div className='flex justify-center items-center'>
                                {data?.rating===0?'':<div className='flex justify-center items-center'>{[...Array(data?.rating)].map(star=><IoIosStar className='text-yellow-600 text-sm'/>)}</div>}
                                <small className='pl-2 text-[10px] font-bold'>({data?.NumberReviews} reviews)</small>
                            </div>
                            </div>
                                    <div className=''>
                                                    <div className='flex justify-center items-center '>
                                                        <button type="button" disabled={data?.stock === 0} onClick={handleAddToCart} className='bg-black hover:bg-opacity-75 text-white text-base font-semibold py-1 px-28 border border-blue-700 rounded'>Add to cart</button>
                                                    </div>
                                            <div className='flex justify-evenly items-center mt-2'>
                                                            <div className=''>
                                                                <button className='bg-green-700 hover:bg-opacity-75 text-white text-sm font-semibold py-1 px-12 border rounded' onClick={() => { navigate(`/product/${data?._id}/edit`) }}>Edit</button><br />
                                                            </div>
                                                            <div className=''>
                                                                <button className='bg-red-700 hover:bg-opacity-75 text-white text-sm font-semibold py-1 px-10 rounded' onClick={deletehandler}>Delete</button><br />
                                                            </div>
                                            </div>
                                    </div>
                </div>
            </div> 
            }
            <div className='m-auto flex justify-center'>
                        <div className='mt-5 border border-zinc-300 w-[24rem] rounded'>
                            {data?.reviews.length === 0 ? (<p className='text-center'>No reviews found</p>) : data?.reviews.map((review) => <>
                                <strong className='pl-2 text-blue-800 font-bold font-poppins'>{review.name}</strong>
                                <div className='flex'>
                                {[...Array(review.rating)].map(star=><IoIosStar className='text-yellow-600 text-lg pl-2'/>)}
                                </div>
                                <p className='pl-2 font-IBM font-semibold'>{review.comment}</p>
                            </>)}
                        </div>

                        <div className='border border-zinc-300 ml-6 mt-6 w-[30rem] rounded'>
                        <h2 className='text-xl font-bold  ml-4 '>Write a customer review</h2>
                                {userinfo?.isAdmin===false?
                            <form action="" onSubmit={submit}>
                                <div className='flex'>
                                {[...Array(5)].map((star,i)=>{
                            const ratingval=i+1
                            return (
                            <>
                            <div className='flex ml-2.5'>
                                <IoIosStar id='rating' className={`${ratingval<=rating?'text-yellow-600':''} cursor-pointer pl-1 text-lg`} onClick={()=>setrating(ratingval)}/>
                                </div>
                                </>
                                
                                )})
                                }
                                </div>
                                <select className='mt-3 ml-4 border text-sm rounded text-white bg-slate-800 outline-none' name="rating" value={rating} onChange={(e) => setrating(Number(e.target.value))}>
                                    <option value="">Select</option>
                                    <option className=''  value="1">1-Poor</option>
                                    <option className='' value="2">2-Fair</option>
                                    <option className='' value="3" selected>3-Good</option>
                                    <option className='' value="4">4-Very good</option>
                                    <option className='rounded-lg' value="5">5-Excellent</option>
                                </select><br /><br />
                                <textarea name="comment" className='focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:border-none ml-4 resize-none caret-blue-600 outline-none border pl-2 rounded' cols={30} rows={3} value={comment} placeholder='Comment' onChange={(e) => setcomment(e.target.value)}></textarea><br /><br />
                                <input type="submit" className='cursor-pointer ml-4 mb-2 bg-black hover:bg-opacity-75 text-white text-sm font-semibold py-1 px-3 border border-blue-700 rounded' value="Submit" />
                                
                            </form> :<p className='py-4 text-center'>Please <Link to='/login' className='underline underline-offset-4 decoration-2 font-semibold decoration-blue-600'>sign in</Link> to post a review </p>}
                        </div>
            </div>
        </>
    )
}

export default ProductParams 

// value={rating}
 
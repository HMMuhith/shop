import React from 'react'
import { useGetProductsQuery } from './productshopSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from './pagination'
import Title from './title'
import Image from './Image'
import Loader from './loader'

const Main = () => {

    const { keyword, pagenumber } = useParams()
    const navigate = useNavigate()
    const { data,isLoading,error } = useGetProductsQuery({ keyword, pagenumber })


    return (
        <> 
            <Title title='Shop' />
            <Image/>
            
    { isLoading? 
    <Loader/>: error?
   ( <div>{error?.data?.message || error.error}</div>  ) : 
    <div className='lg:flex lg:w-full lg:justify-center lg:items-center border border-black flex justify-center items-center'>
         <div className='flex flex-col w-3/4 mx-2 justify-center items-center border-2  border-solid border-yellow-600 h-auto lg:flex lg:flex-row lg:justify-around lg:items-center lg:my-6 lg:w-3/4 lg:mx-2  lg:border-2  lg:border-solid lg:border-yellow-600 lg:h-auto '>
                {/* border-solid border-2 border-orange-400 grid grid-cols-3 gap-x-20 gap-y-20 */}
                {data?.products && data?.products.map((product) => {
                    return (
                        <>
                            <div className='lg:border-2 lg:font-bold lg:text-lg lg:my-2 lg:border-solid lg:border-sky-600 lg:inline-block border-2 font-bold text-lg my-6 border-solid border-sky-600 inline-block'>

                                <div className='lg:flex lg:justify-center lg:items-center lg:my-2 lg:font-poppins flex justify-center items-center my-2 font-poppins'>
                                    <p className='lg:border-2 lg:border-solid lg:border-red-600 border-2 border-solid border-red-600' key={product._id}>{product.product_name}</p>
                                </div>

                                <div className='lg:w-52 lg:h-48 lg:flex lg:justify-center w-36 h-32 flex justify-center'>
                                    <img key={product._id}  src={`/BackendImage/${product.image}`} className='lg:hover:scale-110 lg:border-solid lg:cursor-pointer lg:border-blue-400  lg:border-2 lg:rounded lg:object-cover hover:scale-110 border-solid cursor-pointer border-blue-400  border-2 rounded  object-coverlg: ' alt="" />
                                </div>

                                <div className='lg:my-3 my-3'>
                                    <p className='lg:font-bold lg:border-solid lg:border-2 lg:border-red-600 lg:rounded lg:flex lg:justify-center lg:items-center lg:text-cyan-800 font-bold border-solid border-2 border-red-600 rounded flex justify-center items-center text-cyan-800'>{product.price}<strong>৳</strong></p>
                                </div>

                                <div className='lg:flex lg:justify-center lg:items-center lg:my-3 flex justify-center items-center my-3'>
                                    <button className='lg:text-white lg:bg-blue-700 lg:hover:bg-blue-800 lg:focus:ring-4 lg:focus:ring-blue-300 lg:font-medium lg:rounded-lg lg:text-sm lg:px-5 lg:py-2.5  lg:dark:bg-blue-600 lg:dark:hover:bg-blue-700 lg:focus:outline-none lg:dark:focus:ring-blue-800 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={() => {
                                        navigate(`/product/${product._id}`)
                                    }}>Details</button>
                                </div>
                            </div>

                        </>
                    )


                })}
        </div>
     </div>
}
            <div className='flex justify-center items-center my-20'>
                <Pagination pages={data?.highestpage} page={data?.page} keyword={keyword?keyword:''} />
            </div>
        </>
    )
}

export default Main

 
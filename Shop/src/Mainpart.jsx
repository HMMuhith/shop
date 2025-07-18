import React,{useState} from 'react'
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
    const [position,setposition]=useState(false)

const passhandler=()=>{
setposition((position)=>!position)
}
    return (
        <> 
            <Title title='Shop' />
            <Image/>
            <div className='ml-[1250px] absolute top-[300px]'>
            <div onClick={passhandler} className='w-[45px] h-[45px] bg-round rounded-full  z-50 cursor-pointer overflow-hidden flex relative justify-center items-center text-center text-[10px]'>Email & Pass </div>
             {position?
            <div className='flex mr-3 text-nowrap top-1 bg-position text-white rounded-lg flex-col absolute right-[18px]  opacity-100 transform duration-800 ease-linear translate-x-0'>
                    <span className='px-7 py-1.5  '>Email: iran@gmail.com  Pass: iran123 </span>
                </div>:
                (<div className='flex mr-3 text-nowrap top-1 bg-position text-white rounded-lg flex-col absolute right-[18px]  opacity-0 transform duration-200 ease-linear translate-x-6'>
                    <span className='px-7 py-1.5 '>Email: iran@gmail.com  Pass: iran123 </span>
                </div>)}
                </div>
    { isLoading? 
    <Loader/>: error?
   ( <div>{error?.data?.message || error.error}</div>  ) : 
    <div className='lg:flex lg:w-full lg:justify-center lg:items-center flex justify-center items-center'>
         <div className='flex flex-col w-3/4 mx-2 justify-center items-center  h-auto lg:flex lg:flex-row lg:justify-around lg:items-center lg:my-6 lg:py-7 lg:w-3/4 lg:mx-2  bg-slate-100 lg:bg-slate-50 dark:bg-zinc-600 lg:border lg:border-zinc-300 lg:rounded-lg rounded-lg dark:rounded-lg dark:lg:rounded-lg  dark:lg:border-none dark:border-none lg:h-auto '>
                {/* border-solid border-2 border-orange-400 grid grid-cols-3 gap-x-20 gap-y-20 */}
                {data?.products && data?.products.map((product) => {
                    return (
                        <>
                            <div onClick={() => {
                                        navigate(`/product/${product._id}`)}} className='lg:border lg:bg-white bg-zinc-50 dark:bg-zinc-800 dark:lg:rounded-lg dark:lg:border-none dark:border-none  lg:font-bold lg:text-lg lg:my-2 lg:border-solid rounded-lg lg:rounded-lg lg:inline-block border font-bold text-lg my-6 border-solid  inline-block'>

                                <div className='lg:flex lg:justify-center lg:items-center lg:my-2 lg:font-poppins flex justify-center items-center my-2 font-poppins'>
                                    <p className='' key={product._id}>{product.product_name}</p>
                                </div>

                                <div className='lg:w-52 lg:h-48 lg:flex lg:justify-center w-36 h-32 flex justify-center'>
                                    <img key={product._id}  src={`/BackendImage/${product.image}`} className='lg:hover:scale-110  lg:cursor-pointer lg:rounded lg:object-cover hover:scale-110  cursor-pointer rounded  object-coverlg: ' alt="" />
                                </div>

                                <div className='lg:my-3 my-3'>
                                    <p className='lg:font-bold   lg:rounded lg:flex lg:justify-center lg:items-center dark:lg:text-white dark:text-white lg:text-cyan-800 font-bold  rounded flex justify-center items-center text-cyan-800'>{product.price}<strong>৳</strong></p>
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

 

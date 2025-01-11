import React, { useState } from 'react'
import { useGetTopProductsQuery } from './productshopSlice'


const ProductCarousel = () => {
  const { data } = useGetTopProductsQuery()
  console.log(data)
  const [index,setIndex]=useState(0)
  // for(let i=0;i<data.length;i++)
  
  const next=()=>{
    setIndex((number)=>
   { 
    if(number===data.length-1) return 0

      return number+1 }
  )

  }
  const prev=()=>{
    setIndex((number)=>{
      if(number===0) return data.length-1
      return number-1
    })
  }
  return (
    <>
    <div className='flex justify-center items-center mt-6 mb-10'>
    <div className='flex gap-10 h-auto'>
      {data?.map(product => {
        return (
          <>
       
              <div className='w-[40rem] flex justify-center items-center h-auto border border-red-600'>
                
            <img src={require(`./BackendImage/${product.image}`)} className='w-72 ' alt="" />
            </div>
           
          </>
        )
      }
      )
      }
      
      </div>
      </div>
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  )
}

export default ProductCarousel
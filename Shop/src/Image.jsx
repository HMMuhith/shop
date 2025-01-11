import React, { useEffect, useState } from 'react'
import iPhone from '/BackendImage/iphone.PNG'
import CC from '/BackendImage/cc.PNG'
import Router from '/BackendImage/rt2.PNG'
import Cable from '/BackendImage/cable.PNG'


const images = [iPhone, CC, Router, Cable]

const Image = () => {



  const [slide, setSlide] = useState(0)
  const next = () => {
    setSlide((cur) => 
         cur===images.length-1 ? 0 : cur+1
      // if (slide === images.length - 1) return 0
      // return slide + 1
    )

  }
  
  useEffect(()=>{
 
    const setall=setInterval(next,3000)
    return ()=> clearInterval(setall)
  },[])

  return (
    <>

                <div className='lg:flex flex flex-col lg:flex-col my-10 lg:my-10 overflow-hidden lg:overflow-hidden lg:justify-center justify-center items-center lg:items-center  '>
                       
                            <div className='lg:w-[28rem] lg:h-[32rem] w-[16rem] h-[20rem]  lg:overflow-hidden overflow-hidden  lg:flex flex lg:border border '>
                              {images.map((url, index) =>

<img style={{transform:`translateX(-${slide*100}%)`}} src={url} alt="" className={`lg:flex flex lg:justify-center justify-center lg:items-center items-center lg:w-full w-full h-full lg:h-full lg:object-contain object-contain`} />
                                
                          )}
                            </div>
                         
                            <div className=' lg:w-20 lg:h-8 lg:flex  lg:items-center lg:top-[26.5rem]'>
                              {images.map((_, index) =>
                                <button key={index} className={`lg:mx-0.5 lg:cursor-pointer  mx-0.5 cursor-pointer lg:w-1.5 lg:h-1.5 w-1.5 h-1.5 outline-none lg:outline-none ${slide===index?'lg: bg-blue-700':'lg:bg-black bg-black'} rounded-full lg:rounded-full`}>

                                </button>

                              )}
                            </div>



                </div>
        

        {/* <div className='absolute flex justify-around items-center top-[26.5rem]'>
                    <div className='pr-2'>
                          <button onClick={prev} className='w-1.5 h-1.5 rounded-full bg-black'></button>
                   </div>
                    <div>
                          // <button onClick={next} className='w-1.5 h-1.5 rounded-full bg-black'></button>
                    </div>
                </div> */}

     
    </>
  )
}
export default Image

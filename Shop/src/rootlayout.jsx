import React from 'react'
import Header from './Header'
import Main from './Mainpart'
import Footer from './Footer'
import Success from './success_notification'
import Scroll from './scrolling'

const RootLayOut = () => {
  return (
    <>
    <div>

   
   <Header/>
   <Scroll/>
   <Main/>
   <Footer/>
   
   </div>
    </>
  )
}

export default RootLayOut
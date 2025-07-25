import React,{useEffect} from 'react'
import Header from './Header'
import Main from './Mainpart'
import Footer from './Footer'
import Success from './success_notification'
import Scroll from './scrolling'
import TimeOut from './timeout'

const RootLayOut = () => {
  useEffect(()=>{
    const elem=document.getElementById('timeout')
    setTimeout(()=>{
      elem?.remove()
    },9000)
    },[])

    const test=()=>{
      const elem=document.getElementById('timeout')
      elem.remove()
    }
  return (
    <>
    <div>
    <div id="timeout" className="fixed top-0 z-40"><TimeOut ontest={test}/></div>

   <Header/>
   <Scroll/>
   <Main/>
   <Footer/>
   
   </div>
    </>
  )
}

export default RootLayOut
import React from 'react'
import { useState,useEffect } from 'react'

const Clock=()=>{
    const [time, setTime] = useState(new Date())
  useEffect(() => {
   const Interval= setInterval(() => {
      setTime(new Date())
      
    },1000)

    return ()=>{
      clearInterval(Interval)
          }
  }, []
  )
  const Time=()=>{
    let hour=time.getHours()
    let minute=time.getMinutes()
    let seconds=time.getSeconds()
    const meridian=hour >=12?`PM` : `AM`
    hour=hour % 12 || 12

    return `${check(hour)} : ${check(minute)} : ${check(seconds)} ${meridian} `
   
  }
  const check=(number)=>{
    return (number < 10?'0' : '')+number
}
  return (
    <div className='w-80 flex justify-center items-center' >
    <h1 className='text-4xl text-white'>{Time()}</h1><br /><br />
  </div>
  )
}
export default Clock

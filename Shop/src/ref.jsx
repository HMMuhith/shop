import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'

export default function Reference() {
    const ref=useRef(null)
    useEffect(()=>{
      const call=(e)=>{
        if(e.code==='Enter'){
          ref.current.focus()
        }
    }
       document.addEventListener('keydown',call)
       
    },[])
    const [count,setcount]=useState(0)
   const increment=()=>{
      setcount(count+1)
     }
     const decrement=()=>{
      setcount(count-1)
     }
     const[name,setname]=useState(null)
const diplayname=useCallback((e)=>{
  setname(e.target.value)
  console.log(name)},[name])
  return (
    <div>
       <input type="text" value={name} onChange={diplayname}/><br /><br />
       <button type="button" >Button</button><br />
       <button type="button" onClick={increment}>Increment</button>
       <h1>{count}</h1>
       <button type="button" onClick={decrement}>Decrement</button>

    </div>
  )
}


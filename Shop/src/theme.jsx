import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const ThemeContext = createContext()

const Theme=({children})=>{
  const [Dark,setDark]=useState(false)
   
  const toggle=()=>{
    // setDark( Dark==='dark'? 'light':'dark' )
    setDark(Dark=>!Dark)
    
    
  }
   


  return (<ThemeContext.Provider value={{Dark,toggle}}>
    {children}
  </ThemeContext.Provider>)
}
export {Theme} 
export default ThemeContext
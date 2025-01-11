import React from 'react'
import Context from './context'
import { useContext } from 'react'

 const Increment=()=>{
    const {count,increment}=useContext(Context)
  return (
    <>
   <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} type='button' onClick={increment}>Increment</button><br />
   <p>{count}</p>
    </>
  )
}
export default Increment

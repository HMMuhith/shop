import React from 'react'
import { NavLink } from 'react-router-dom'

const Pagination = ({pages,page,keyword}) => {
  console.log([...Array(pages).keys()])
  return (
    <>
    <div className="flex space-x-1">
{ [...Array(pages).keys()].map((pages)=>
  
     <NavLink key={pages+1} to={keyword? `/search/${keyword}/page/${pages+1}`:`/page/${pages+1}`} className={({isActive})=>isActive? pages+1===page :''}>
  <button className="min-w-9 rounded-md bg-slate-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
  {pages+1}
  </button>
  </NavLink>
)

}
</div> 
</>
  )
}

export default Pagination
import React,{useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {IoSearchOutline} from 'react-icons/io5'

 const Search = () => {
    const navigate=useNavigate()
     const {keyword:urlkeyword}=useParams()
     const [keyword,setkeyword]=useState(urlkeyword||'' )
     const submit=(e)=>{
e.preventDefault()
if(keyword.trim()){
    setkeyword('')
navigate(`/search/${keyword}`)
}
else{
    navigate('/')
}
     }
    return (
        <div>
            <form className='flex items-center' action="" onSubmit={submit}>
                <div>
            <input type="search" name='search' className='outline-0 focus:ring-0 focus:ring-offset-1 focus:ring-black focus:ring-offset-black caret-blue-600 scroll:smooth text pl-4 rounded-l-md ring-black focus:border-slate-800 w-[30rem] h-8' spellCheck={false} placeholder='search...' value={keyword} onChange={(e)=>setkeyword(e.target.value)}/>
            </div>
            <div className='bg-black h-[2.065rem] active:bg-black hover:opacity-60 flex items-center justify-center w-[3.2rem] rounded-r-md'>
            <button type='submit' ><IoSearchOutline className='text-cyan-600 text-2xl '/></button>
            </div>
            </form>
        </div>
    )
}


export default Search


// hover:opacity-75 text-white flex items-center justify-center w-[2.75rem] font-bold h-[2.18rem]  outline-none border-2 border-red-700 rounded-r-md











// includes
// trim
// filter

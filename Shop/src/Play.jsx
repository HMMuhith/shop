import React from 'react'


const Play=()=>{

    return (
        <>
        <div className='w-full h-screen '>
        <video style={{width:'100%',height:'100%',objectFit:'cover'}}  autoPlay loop muted></video>
        </div>
        </>
    )
}
export default Play


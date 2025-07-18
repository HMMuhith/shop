"use client"
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate ,NavLink, Link} from 'react-router-dom'
import validator from 'validator'
import { useDispatch,useSelector} from 'react-redux'
import { useLogInMutation } from './usershopSlice'
import { Credentials } from './authSlice'
import Success from './success_notification'
import Fail from './fail_notification'


const LogIn = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()

const {search}=useLocation()
const sp=new URLSearchParams(search)
const redirect=sp.get('redirect') || '/'
// const isLogin=search.get('redirect')==='login'
const [login,{isLoading}]=useLogInMutation()
const {userinfo}=useSelector(state=>state.auth)

const [user, setUser] = useState({
  email: '',
  password: ''
})

const [status,setstatus]=useState({type:''})
const [error, setError] = useState({
  emailempty: '',
  emailat:'',
  password: '',

})

const handleUnit = (e) => {
  const name = e.target.name
  const value = e.target.value
  setUser({ ...user, [name]: value })
 
}

useEffect(()=>{
  if(userinfo){
    navigate(redirect)
  }
},[userinfo,redirect])


function testify(){
  setTimeout(()=>{
    return navigate(redirect);
  },3000)
}

const submit = async (e) => {
  e.preventDefault()

  if (validator.isEmpty(user.email)) {
    return setError({ ...error, emailempty: `Email field required` })
  }

 setError({...error,email:''})



 if(!validator.isEmail(user.email)){
  return setError({...error,emailat:`invalid email`})
 }
 setError({...error,emailat:''})
  if (validator.isEmpty(user.password)) {
    return setError({ ...error, password: `password field required` })
  }



  setError({...error,password:''})
 

  const newUser = {
    email: user.email,
    password: user.password
  }
  try {
  const response = await login(newUser).unwrap()
dispatch(Credentials({...response}))
setstatus({type:'success'})
testify()
}

catch (err){

 setstatus({type:'fail'})
 
  console.log(err?.data?.message || err?.data)
}
}

function failing(){
  setTimeout(()=>{
    const message=document.getElementById('fail')
    message?.remove()
  },3000)
}

  return (
    <>
    <div className='flex justify-center  items-center mb-24'>
       <div className="w-full max-w-xs mt-14">
       
        <form noValidate className='bg-white shadow-[1px_1px_8px_2px_rgba(0,0,0,0.1)] border-2 dark:border-none dark:bg-zinc-900 dark:rounded px-8 pt-6 pb-8 mb-4' onSubmit={submit}>
          <div className='dark:bg-zinc-700 dark:text-white'>

            <input type="email"  className='shadow dark:bg-zinc-600 dark:text-white bg-white dark:border-none dark:rounded appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight dark:focus:outline-none focus:outline-none focus:shadow-outline' name="email" onChange={handleUnit} value={user.email} placeholder='Email' required />
             {validator.isEmpty(user.email) && <span className='text-red-500'>{error.emailempty}</span> || !validator.isEmail(user.email) && <span className='text-red-500'>{error.emailat}</span>}
           
          </div><br />
          <div>

            <input type="password" className='dark:border-none dark:bg-zinc-600 shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" onChange={handleUnit} value={user.password} placeholder='Password' required />
            {validator.isEmpty(user.password) && <span className='text-red-500'>{error.password}</span>}
          </div><br /><br />
        
          <div className='flex justify-center items-center'>

            <input type="submit" className='bg-black dark:bg-blue-600 dark:text-white hover:bg-opacity-75 text-white text-base font-semibold py-1 px-20 cursor-pointer border border-blue-700 rounded' disabled={isLoading} name='submit' value='Log in' />

          </div><br />
          <div className='flex justify-center items-center'>
          <p>
            New here? <Link to={redirect? `/signup?redirect=${redirect}` :`/signup`} style={{color:`blue`}}>Sign up</Link>
          </p>
          </div>
          
          
        </form>
        {status.type=='success' && <Success message={`You signed in successfully`}/>}
          {status.type=='fail' && <div id="fail"><Fail message={`Failed attempt`}/></div> }
          {status.type=='fail' && failing() }
     
      </div>
      </div>
    </>
  )
}
export default LogIn
 

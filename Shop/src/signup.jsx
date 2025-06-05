import React, { useEffect, useState } from 'react'
import { useNavigate,Link, useLocation } from 'react-router-dom'
import validator from 'validator'
import {useSignUpMutation} from './usershopSlice'
import Success from './success_notification'
import Fail from './fail_notification'
import { useSelector } from 'react-redux'


const SignUp = () => {
  const [signup]=useSignUpMutation()
  const [user, setUser] = useState({
    Name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const [error,setError]=useState({
    NAMEempty:'',
    NAMEval:'',
    emailempty:'',
    emailat:'',
    passwordempty:'',
    passwordval:'',
    confirm_password:'',
    confirm_passwordmatch:'',

  })

  const [status,setstatus]=useState({type:''})

  const navigate = useNavigate()

  const {userinfo}=useSelector(store=>store.auth)

  const {search}=useLocation()

const sp=new URLSearchParams(search)

const redirect=sp.get('redirect') || '/'


useEffect(()=>{
  if(userinfo){
    navigate(redirect)
  }
},

[userinfo,redirect]
)
  const handleUnit = (e) => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
  }

  function testify(){
    setTimeout(()=>{
      return  navigate('/login');
    },3000)
  }

  const submit = async (e) => {
    e.preventDefault()
    
    if (validator.isEmpty(user.Name)) {
     return setError({...error,NAMEempty : 'name field required'})
      
  }
  setError({...error,NAMEempty:''})
    if (!validator.isLength(user.Name, { min: 2, max: 30 })) {
       return setError({...error,NAMEval:`value must be within 2 to 30 characters`})
       
    }
    setError({...error,NAMEval:''})
    if (validator.isEmpty(user.email)) {
       return setError({...error,emailempty:`Email field required`})
    }
setError({...error,emailempty:''})
    if (!validator.isEmail(user.email)) {
         return setError({...error,emailat:` Invalid Email`})
  }
setError({...error,emailat:''})
    if (validator.isEmpty(user.password)) {
     return setError({...error,passwordempty:`password field required`})
       }
setError({...error,passwordempty:''})
    if (!validator.isLength(user.password, { min: 4, max: 15 })) {
         return setError({...error,passwordval:`password must be between 4 to 15 characters`})
    }
    setError({...error,passwordval:''})
    if (validator.isEmpty(user.confirm_password)) {
        return setError({...error,confirm_password:`confirm_password field required`})
    }
    setError({...error,confirm_password:''})
    if (!validator.equals(user.password, user.confirm_password)) {
         return setError({...error,confirm_passwordmatch:`password must match`})
    }
    
    else {

      const newUser = {
        Name: user.Name,
        email: user.email,
        password: user.password,
        confirm_password: user.confirm_password
      }
      try {
        const response = await signup(newUser).unwrap()
        setstatus({type:'success'})
       testify()
        
        }
        catch (err){ 
          setstatus({type:'fail'})
          
        } 
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
  <div flex className=' flex shrink justify-center items-center'>
    <div class=" w-full max-w-xs mt-14 ">

      <form noValidate className='bg-white h-full dark:bg-zinc-900 dark:border-none border-2 border-solid  shadow-[1px_1px_8px_1px_rgba(0,0,0,0.15)] rounded px-8 pt-6 pb-8 mb-4' onSubmit={submit}>
        <div>

          <input type="text" className='dark:bg-zinc-600 shadow border-black appearance-none dark:border-none dark:text-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="Name" id="" onChange={handleUnit} value={user.Name} placeholder='Name' />

{validator.isEmpty(user.Name) && <span className='text-red-500 text-sm'>{error.NAMEempty}</span> || !validator.isLength(user.Name,{min:2,max:30}) && <span className='text-red-500 text-sm'>{error.NAMEval}</span>}
        </div><br />
        <div>

          <input type="email" className='dark:bg-zinc-600 shadow appearance-none dark:border-none dark:text-white border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="email" id="" onChange={handleUnit} value={user.email} placeholder='Email'  />
           {validator.isEmpty(user.email) && <span className='text-red-500 text-sm'>{error.emailempty}</span> || !validator.isEmail(user.email) && <span className='text-red-500 text-sm'>{error.emailat}</span>}
        </div><br />
        <div>

          <input type="password" className='dark:bg-zinc-600 shadow border-black appearance-none dark:border-none dark:text-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" id="" onChange={handleUnit} value={user.password} placeholder='Password'  />
          {
          validator.isEmpty(user.password) && <span className='text-red-500 text-sm'>{error.passwordempty}</span> || 
          !validator.isLength(user.password,{ min: 4, max: 15}) && <span className='text-red-500 text-sm'>{error.passwordval}</span>}
        </div><br />
        <div>

          <input type="password" className='dark:bg-zinc-600 shadow border-black appearance-none dark:border-none dark:text-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="confirm_password" id="" onChange={handleUnit} value={user.confirm_password} placeholder='Confirm Password'  />
          {validator.isEmpty(user.confirm_password) && <span className='text-red-500 text-sm'>{error.confirm_password}</span> || !validator.equals(user.password,user.confirm_password) && <span className='text-red-500 text-sm'>{error.confirm_passwordmatch}</span>}
        </div><br /><br />
        <div className='flex justify-center items-center mb-3'>

          <input type="submit" className='bg-black dark:bg-blue-600 dark:text-white hover:bg-opacity-75   text-white text-base font-semibold py-1 px-20 cursor-pointer border border-blue-700 rounded' name='submit' value='Sign Up ' />
           
        </div>
<div className='flex justify-center items-center'>
          <p>
            Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} style={{color:`blue`}}>Login</Link>
          </p>
          </div>
      </form>
{status.type=='success' && <Success message={`You registered successfully`}/>}
{status.type=='fail' && <div id="fail"><Fail message={`Something went wrong .Try again`}/></div>}
{status.type=='fail' && failing()}
      </div>
      </div>
    </>
  )
}
export default SignUp
 
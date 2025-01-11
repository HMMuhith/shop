"use client"
import React, {useState} from 'react'
import { useLocation, useNavigate ,NavLink, Link} from 'react-router-dom'
import validator from 'validator'
import { useDispatch} from 'react-redux'
import { useLogInMutation } from './usershopSlice'
import { Credentials } from './authSlice'


const LogIn = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
// const [search]=useSearchParams()
const {search}=useLocation()
const sp=new URLSearchParams(search)
const redirect=sp.get('redirect') || '/order'
// const isLogin=search.get('redirect')==='login'
const [login,{isLoading}]=useLogInMutation()
// const {userinfo}=useSelector(state=>state.auth)

const [user, setUser] = useState({
  email: '',
  password: ''
})

const [error, setError] = useState({
  email: '',
  password: '',
  login:''
})

const handleUnit = (e) => {
  const name = e.target.name
  const value = e.target.value
  setUser({ ...user, [name]: value })
 
}

// useEffect(()=>{
//   if(userinfo){
//     navigate(redirect)
//   }
// },[navigate,userinfo])




const submit = async (e) => {
  e.preventDefault()

  if (validator.isEmpty(user.email)) {
    return setError({ ...error, email: `Email field required` })
  }

  if (validator.isEmpty(user.password)) {
    return setError({ ...error, password: `password field required` })
  }

  const newUser = {
    email: user.email,
    password: user.password
  }
  try {
  const response = await login(newUser).unwrap()
dispatch(Credentials({...response}))
navigate(redirect)
  
}

catch (err){
  setError({...error,login:`* Invalid email or password`})
  console.log(err?.data?.message || err?.data)
}
}

  return (
    <>
    <div className='flex justify-center items-center mb-24'>
       <div className="w-full max-w-xs mt-14">
       {error.login ?<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert'>
      <span className='text-red-800'>{error.login}</span>
      </div>:'' }
        <form noValidate className='bg-white shadow-[1px_1px_8px_2px_rgba(0,0,0,0.1)] border-2  px-8 pt-6 pb-8 mb-4' onSubmit={submit}>
          <div>

            <input type="email" className='shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="email" onChange={handleUnit} value={user.email} placeholder='Email' required />
             <span className='text-red-500'>{error.email}</span>
          </div><br />
          <div>

            <input type="password" className='shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" onChange={handleUnit} value={user.password} placeholder='Password' required />
             <span>{error.password}</span>
          </div><br /><br />
        
          <div className='flex justify-center items-center'>

            <input type="submit" className='bg-black hover:bg-opacity-75 text-white text-base font-semibold py-1 px-20 cursor-pointer border border-blue-700 rounded' disabled={isLoading} name='submit' value='sign in' />

          </div><br />
          <div className='flex justify-center items-center'>
          <p>
            New here? <Link to='/signup' style={{color:`blue`}}>Sign up</Link>
          </p>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}
export default LogIn
 
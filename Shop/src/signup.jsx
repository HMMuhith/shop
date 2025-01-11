import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import validator from 'validator'
import {useSignUpMutation} from './usershopSlice'


const SignUp = () => {
  const [signup]=useSignUpMutation()
  const [user, setUser] = useState({
    Name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const [error,setError]=useState({
    NAME:'',
    email:'',
    password:'',
    confirm_password:'',
    text:''
  })
  const navigate = useNavigate()
  const handleUnit = (e) => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
  }
  const submit = async (e) => {
    e.preventDefault()
    
    if (validator.isEmpty(user.Name)) {
     return setError({...error,NAME : 'name field required'})
      
  }
    if (!validator.isLength(user.Name, { min: 2, max: 30 })) {
       return setError({...error,NAME:`value must be within 2 to 30 characters`})
       
    }
    if (validator.isEmpty(user.email)) {
       return setError({...error,email:`Email field required`})
    }

    if (!validator.isEmail(user.email)) {
         return setError({...error,email:`Email must include @ character`})
  }

    if (validator.isEmpty(user.password)) {
     return setError({...error,password:`password field required`})
       }

    if (!validator.isLength(user.password, { min: 4, max: 15 })) {
         return setError({...error,password:`password must be between 4 to 15 characters`})
    }
    if (validator.isEmpty(user.confirm_password)) {
        return setError({...error,confirm_password:`confirm_password field required`})
    }
    if (!validator.equals(user.password, user.confirm_password)) {
         return setError({...error,confirm_password:`password must match`})
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
        navigate('/login')
        
        }
        catch (err){ 
          setError({...error,text:`something went wrong`})
        } 
      }

      
    }
  
  // try {
  //   const response = await fetch(`${VITE_BACKEND_URL]/user/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newUser)
  //   })
  //   const data = await response.json()
  //   navigate('/login')
  //   console.log(data)
  // }

  // catch (error){ 
  //   console.log(error)
  // }
  return (
  <>
  <div flex className=' flex shrink justify-center items-center'>
    <div class=" w-full max-w-xs mt-14 ">
      { error.text ? error.text:
      <form noValidate className='bg-white h-full border-2 border-solid  shadow-[1px_1px_8px_1px_rgba(0,0,0,0.15)] rounded px-8 pt-6 pb-8 mb-4' onSubmit={submit}>
        <div>

          <input type="text" className='shadow border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="Name" id="" onChange={handleUnit} value={user.Name} placeholder='Name' />
{/* {validator.isEmpty(user.Name)?<p>Name field required</p> :'' } */}
<span>{error.NAME}</span>
        </div><br />
        <div>

          <input type="email" className='shadow appearance-none border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="email" id="" onChange={handleUnit} value={user.email} placeholder='Email'  />
           <span>{error.email}</span>
        </div><br />
        <div>

          <input type="password" className='shadow border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" id="" onChange={handleUnit} value={user.password} placeholder='Password'  />
          <span>{error.password}</span>
        </div><br />
        <div>

          <input type="password" className='shadow border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="confirm_password" id="" onChange={handleUnit} value={user.confirm_password} placeholder='Confirm Password'  />
          <span>{error.confirm_password}</span>
        </div><br /><br />
        <div className='flex justify-center items-center mb-3'>

          <input type="submit" className='bg-black hover:bg-opacity-75 text-white text-base font-semibold py-1 px-20 cursor-pointer border border-blue-700 rounded' name='submit' value='Sign Up ' />
           
        </div>
<div className='flex justify-center items-center'>
          <p>
            Already have an account? <Link to='/login' style={{color:`blue`}}>Login</Link>
          </p>
          </div>
      </form>
}
      </div>
      </div>
    </>
  )
}
export default SignUp
 
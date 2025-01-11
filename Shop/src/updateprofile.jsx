import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateProfile = () => {
const {userinfo}=useSelector(state=>state.auth)
 const [updateuser, setUser] = useState({
     Name: '',
     email:'',
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
   useEffect(()=>{
    if(userinfo){
      setUser({Name:userinfo.Name,email:userinfo.email})
    }
   },[userinfo])
   const navigate = useNavigate()
   const handleUnit = (e) => {
     const value = e.target.value
     const name = e.target.name
     setUser({ ...updateuser, [name]: value })
   }
   const submit = async (e) => {
     e.preventDefault()
     
     if (validator.isEmpty(updateuser.Name)) {
      return setError({...error,NAME : 'name field required'})
       
   }
     if (!validator.isLength(updateuser.Name, { min: 2, max: 30 })) {
        return setError({...error,NAME:`value must be within 2 to 30 characters`})
        
     }
     if (validator.isEmpty(updateuser.email)) {
        return setError({...error,email:`Email field required`})
     }
 
     if (!validator.isEmail(updateuser.email)) {
          return setError({...error,email:`Email must include @ character`})
   }
 
    //  if (validator.isEmpty(updateuser.password)) {
    //   return setError({...error,password:`password field required`})
    //     }
 
    //  if (!validator.isLength(updateuser.password, { min: 4, max: 15 })) {
    //       return setError({...error,password:`password must be between 4 to 15 characters`})
    //  }
    //  if (validator.isEmpty(updateuser.confirm_password)) {
    //      return setError({...error,confirm_password:`confirm_password field required`})
    //  }
    //  if (!validator.equals(updateuser.password, updateuser.confirm_password)) {
    //       return setError({...error,confirm_password:`password must match`})
    //  }
     
     else {
 
       const newUser = {
         Name: updateuser.Name,
         email: updateuser.email,
         password: updateuser.password,
         confirm_password: updateuser.confirm_password
       }
       try {
         const response = await axios(
          {
            method:'PUT',
            url:`${VITE_BACKEND_URL}/shop/user/profiles`,
            data:newUser,
            headers:{Authorization:userinfo.token}
          }
          )
         console.log(response)
        //  navigate('/login')
         
         }
         catch (err){ 
           setError({...error,text:`something went wrong`})
         } 
       }
 
       
     }
   
   return (
   <>
   <div flex className=' flex shrink justify-center items-center'>
     <div class=" w-full max-w-xs mt-14 ">
       { error.text ? error.text:
       <form noValidate className='bg-white h-full border-2 border-solid  shadow-[1px_1px_8px_1px_rgba(0,0,0,0.15)] rounded px-8 pt-6 pb-8 mb-4' onSubmit={submit}>
         <div>
 
           <input type="text" className='shadow border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="Name" id="" onChange={handleUnit} value={updateuser.Name} placeholder='Name' />
 {/* {validator.isEmpty(updateuser.Name)?<p>Name field required</p> :'' } */}
 <span>{error.NAME}</span>
         </div><br />
         <div>
 
           <input type="email" className='shadow appearance-none border-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="email" id="" onChange={handleUnit} value={updateuser.email} placeholder='Email'  />
            <span>{error.email}</span>
         </div><br />
         <div>
 
           <input type="password" className='shadow border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" id="" onChange={handleUnit} value={updateuser.password} placeholder='Password'  />
           <span>{error.password}</span>
         </div><br />
         <div>
 
           <input type="password" className='shadow border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="confirm_password" id="" onChange={handleUnit} value={updateuser.confirm_password} placeholder='Confirm Password'  />
           <span>{error.confirm_password}</span>
         </div><br /><br />
         <div className='flex justify-center items-center mb-3'>
 
           <input type="submit" className='bg-black hover:bg-opacity-75 text-white text-base font-semibold py-1 px-20 cursor-pointer border border-blue-700 rounded' name='submit' value='Update' />
            
         </div>
 <div className='flex justify-center items-center'>
           
           </div>
       </form>
 }
       </div>
       </div>
     </>
   )
}

export default UpdateProfile
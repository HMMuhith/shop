import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const User = () => {
  const { userinfo } = useSelector(state => state.auth)
  const [Profile, setProfile] = useState()
const Navigate=useNavigate()
  useEffect(() => {
    if (userinfo.isAdmin === true) {
      const Request = async () => {
        const user = await fetch(`${VITE_BACKEND_URL}/shop/user/profiles`,
          {
            method: 'get',
            headers: {
              'Authorization': `${userinfo.token}`
            }
          }
        )
        const data = await user.json()
        const response = data.users
        setProfile(response)
      }
      Request()
    }

  }, [userinfo.isAdmin, userinfo.token])

  const Delete = async (id) => {
    if (window.confirm('Are you want to delete the user?')) {
      fetch(`${VITE_BACKEND_URL}/shop/user//profiles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${userinfo.token}`
        }
      })
      Navigate(0)
    }
  }
  return (
    <>
      <div className='flex justify-center items-center mt-14'>
        <table>
          <thead>
            <tr>
              <th className='border border-zinc-600 text-center p-1'>ID</th>
              <th className='border border-zinc-600 text-center p-1'>Name</th>
              <th className='border border-zinc-600 text-center p-1'>Email</th>
              <th className='border border-zinc-600 text-center p-1'>Created</th>
              <th className='border border-zinc-600 text-center p-1'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Profile?.map(user =>
            (
              <tr>
                <td className='border border-zinc-600 text-center p-1'>{user._id}</td>
                {user.isAdmin === true ? <td className='border border-zinc-600 text-center text-red-700 p-1'>{user.Name}</td> : <td className='border border-zinc-600 text-center p-1'>{user.Name}</td>}
                <td className='border border-zinc-600 text-center p-1'>{user.email}</td>
                <td className='border border-zinc-600 text-center p-1'>{user.date.substring(0, 10)}</td>
                <td className='border border-zinc-600 text-center p-1'>
                  <div className='flex justify-between items-center'>
                    <button type="button" className='bg-green-600 hover:bg-opacity-75 text-white text-xs font-semibold py-0.5 px-4 cursor-pointer border border-blue-700 rounded'><Link to={`/admin/updateuser/${user._id}`}>Edit</Link></button>
                    <button type='button' className='ml-2 bg-red-600 hover:bg-opacity-75 text-white text-xs font-semibold py-0.5 px-4 cursor-pointer border border-blue-700 rounded' onClick={() => Delete(user._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default User        
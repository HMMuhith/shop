import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

const AdminRoute = () => {
 const {userinfo}=useSelector(state=>state.auth)

  return userinfo && userinfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace/>
}

export default AdminRoute
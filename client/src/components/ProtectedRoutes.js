import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
    const user = useSelector(state => state.user)

    if(!user){
        return <Navigate to='/auth'/>
    }

  return <Outlet/>
}

export default ProtectedRoutes
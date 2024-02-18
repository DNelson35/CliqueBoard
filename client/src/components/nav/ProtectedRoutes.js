import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

 function ProtectedRoutes() {
  const userData = useSelector(state => state.user.user)
  
  if(!userData){
    return <Navigate to='/'/>
  }

  return <Outlet/>
}

export default ProtectedRoutes
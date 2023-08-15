import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

 function ProtectedRoutes() {
  const userData = useSelector(state => state.user.user)
// problem data wasnt returned before the naviagion started so the userData was null: Fix:: use async and await in the login and logout functions to insure navigation doesn't start before data is returned
  
  if(!userData){
    return <Navigate to='/'/>
  }

  return <Outlet/>
}

export default ProtectedRoutes
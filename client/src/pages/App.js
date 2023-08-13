import { useEffect } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Nav from "../components/Nav";
import AuthForm from "./Auth"
import Profile from './Profile';
import Welcome from './Welcome';
import ProtectedRoutes from '../components/ProtectedRoutes';


function App() {
  const location = useLocation()
  const { checkUser } = useAuth()

  useEffect(() => {
    checkUser()
  },[])

  return (
    <div >
      {location.pathname !== '/auth' && <Nav/>}
      <Routes>
        <Route path={'/'} element={<Welcome />} />
        <Route path={'/auth'} element={<AuthForm />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path={'/profile'} element={<Profile/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import {Routes, Route, useLocation} from 'react-router-dom'
import Nav from "../components/Nav";
import Login from "./landing/Login"
import Profile from './profile/Profile';
import Welcome from './landing/Welcome';
import ProtectedRoutes from '../components/ProtectedRoutes';
import { useCheckUserQuery } from '../api/authSlice';
import { useSelector } from 'react-redux';
import Signup from './landing/Signup';

function App() {
  const location = useLocation()
  const user = useSelector(state => state.user.user)
  useCheckUserQuery()

  

  return (
    <div >
      {!['/login', '/signup'].includes(location.pathname) && <Nav/>}
      <Routes>
        <Route path={'/'} element={user? <Profile/> : <Welcome/>} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path={'/profile'} element={<Profile/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

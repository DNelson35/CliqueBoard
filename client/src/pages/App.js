import Nav from "../components/Nav";
import Login from "./landing/Login"
import Profile from './profile/Profile';
import Welcome from './landing/Welcome';
import Signup from './landing/Signup';
import Groups from "./profile/Groups";
import ProtectedRoutes from '../components/ProtectedRoutes';
import {Routes, Route, useLocation} from 'react-router-dom'
import { useCheckUserQuery } from '../api/authSlice';
import { useSelector } from 'react-redux';

function App() {
  const location = useLocation()
  const user = useSelector(state => state.user.user)
  useCheckUserQuery()

  
console.log(user)
  return (
    <div >
      {!['/login', '/signup'].includes(location.pathname) && <Nav/>}
      <Routes>
        <Route path={'/'} element={user? <Profile/> : <Welcome/>} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path={'/profile'} element={<Profile/>} />
          <Route path={'/groups'} element={<Groups/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import Nav from "../components/Nav";
import Login from "./landing/Login"
import Profile from './profile/Profile';
import Welcome from './landing/Welcome';
import Signup from './landing/Signup';
import Group from "./profile/Group";
import DashBoard from "./profile/DashBoard";
import ProtectedRoutes from '../components/ProtectedRoutes';
import {Routes, Route, useLocation} from 'react-router-dom'
import { useCheckUserQuery } from '../api/authApi';
import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from "../api/groupApi";

function App() {
  const location = useLocation()
  const user = useSelector(state => state.user.user)
  const groups = useSelector(state => state.groups.groups)

  // console.log('group:', groups)
  // console.log('user:', user?.groups)

  useGetGroupsQuery()
  const {isLoading } = useCheckUserQuery()

  return isLoading? <div>loading...</div> : (
    <div >
      {!['/login', '/signup'].includes(location.pathname) && <Nav/>}
      <Routes>
        <Route path={'/'} element={user? <DashBoard/> : <Welcome/>} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path={'/dashboard'} element={<DashBoard/>} />
          <Route path={'/group/:groupId'} element={<Group/>} />
          <Route path={'/profile'} element={<Profile/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

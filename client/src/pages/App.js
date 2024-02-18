import Nav from "../components/nav/Nav"
import Login from "./landing/Login"
import Profile from './profile/Profile'
import Welcome from './landing/Welcome'
import Signup from './landing/Signup'
import Group from "./profile/Group"
import DashBoard from "./profile/DashBoard"
import About from "./landing/about"
import Future from "./landing/future"
import ProtectedRoutes from '../components/nav/ProtectedRoutes'
import {Routes, Route, useLocation} from 'react-router-dom'
import { useAllUsersQuery, useCheckUserQuery } from '../api/authApi'
import { useSelector } from 'react-redux'
import { useGetGroupsQuery } from "../api/groupApi"
import { useGetConversationsQuery } from "../api/messengerApi"
import Messenger from "./profile/Messenger"
import { useEffect } from "react"

function App() {
  const location = useLocation()
  const user = useSelector(state => state.user.user)
  
  const {isLoading } = useCheckUserQuery()
  const { data: allUsers, refetch } = useAllUsersQuery(undefined, { skip: !user })
  const { refetch: refetchGroup } = useGetGroupsQuery(undefined, { skip: !user })
  const { refetch: refetchConversation } = useGetConversationsQuery(undefined, { skip: !user })

  useEffect(()=>{
    if(user){
      console.log("just ran")
      refetchGroup()
      refetchConversation()
    }
  },[user, refetchGroup, refetchConversation])

  return isLoading ? <div>loading...</div> : (
    <div >
      {!['/login', '/signup'].includes(location.pathname) && <Nav/>}
      <Routes>
        <Route path={'/'} element={user? <DashBoard/> : <Welcome/>} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup/>} />
        <Route path={'/about'} element={<About/>} />
        <Route path={'/future'} element={<Future/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path={'/dashboard'} element={<DashBoard/>} />
          <Route path={'/group/:groupId'} element={<Group allUsers={allUsers} refetch={refetch}/>} />
          <Route path={'/profile'} element={<Profile/>} />
          <Route path={'/messenger'} element={<Messenger allUsers={allUsers}/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

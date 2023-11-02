import React, {useState} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import EditUserForm from '../../components/EditUserForm'
import { FiEdit2 } from 'react-icons/fi'

function Profile() {
  const user = useSelector(state => state.user.user)
  const [edit, setEdit] = useState(false)


  return edit? <EditUserForm setEdit={setEdit}/> : (
   <div className='flex h-screen w-full justify-center overflow-hidden bg-slate-900 text-white'>
    <div className='flex-col'>
      <div className='flex justify-center space-x-1'>
        <h1 className='text-5xl uppercase text-purple-400 font-bold'>{user.name}</h1>
        <FiEdit2 className='flex self-end text-2xl' onClick={() => setEdit(true)}/>
      </div>
      <div className='flex h-full w-screen items-center justify-evenly ml-[5%] z-10'>
        <div className='flex-col space-y-20 mb-32 z-10'>
          <h2 className=' text-2xl'>Name: <span className='ml-5'>{user.name}</span></h2>
          <h2 className=' text-2xl'>Age: <span className='ml-5'>{user.age}</span></h2>
        </div>
        <div className='flex-col space-y-20 mb-32 z-10'>
          <h2 className=' text-2xl'>Username: <span className='ml-5'>{user.username}</span></h2>
          <h2 className=' text-2xl'>Email: <span className='ml-5'>{user.email_address}</span></h2>
        </div>
        <div className='fixed transform-[translate(-50%, -50%) h-3/4 w-3/4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 blur-3xl bg opacity-20 mr-32'></div>
        
      </div>
    </div>
   </div>
  )
}

export default Profile
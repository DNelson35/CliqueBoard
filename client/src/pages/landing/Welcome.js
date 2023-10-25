import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../../assets/planning.png'
import OnlineUsersReceiver from '../../components/OnlineUsersReceiver'

function Welcome() {

  const navigate = useNavigate()


  return (
   <div className='w-full'>
      <div className='flex justify-between h-screen bg-slate-700'>
        <div className='flex flex-col justify-center w-1/2 ml-40'>
          <h1 className='text-white text-7xl font-bold'>Transform and Thrive</h1>
          <p className='pt-6 text-white text-xl font-bold w-[70%]'>Your All-in-One Solution for Family Organization - Seamlessly Plan Events, Manage Tasks, and Customize Your Family's Journey to Perfection.</p>
          <button className='h-12 w-40 mt-6 text-white text-2xl font-bold rounded-lg bg-gradient-to-t bg-blue-600 hover:from-blue-400 hover:to-blue-600  ' onClick={() => navigate('/signup')}>Sign up</button>
          
        </div>
        <div className='flex flex-col justify-center w-1/2 '>
        {/* TODO: replace image with better image */}
          <img src={image} alt='planning' className='mt-20 h-3/4 w-full' />
        </div>
      </div>
      <div className='flex justify-end h-screen bg-blue-400'>
        <div className='flex flex-col justify-center w-1/2 ml-40'>
          <h1 className='text-white text-7xl font-bold'>Manage Groups</h1>
          <p className='pt-6 text-white text-xl font-bold w-[70%]'>Manage and Join groups. CliqueBoard groups have access to a interactive calendar for scheduling meetings, and other events.</p>
        </div>
      </div>
      <div className='flex justify-start h-screen bg-purple-400'>
        <div className='flex flex-col justify-center w-1/2 ml-40'>
          <h1 className='text-white text-7xl font-bold'>Messenger</h1>
          <p className='pt-6 text-white text-xl font-bold w-[70%]'>CliqueBoard strives to keep groups and group members connected. Using the messenger group members can message users that are in their groups. Each group also comes with a group messenger for all members to host discussions.</p>
        </div>
      </div>
      <OnlineUsersReceiver/>
   </div>
  )
}

export default Welcome
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {

  const navigate = useNavigate()


  return (
   <div>
      <div className='bg-pink-300 h-screen'>
        <div className='absolute mt-[10%] ml-[10%] w-[40%] h-[40%]'>
          <h1 className='text-white text-7xl font-bold'>Transform and Thrive</h1>
          <p className='pt-6 text-white text-xl font-bold w-[70%]'>Your All-in-One Solution for Family Organization - Seamlessly Plan Events, Manage Tasks, and Customize Your Family's Journey to Perfection.</p>
          <button className='h-12 w-40 mt-6 text-white text-2xl font-bold rounded-lg bg-gradient-to-t bg-blue-600 hover:from-blue-400 hover:to-blue-600  ' onClick={() => navigate('/signup')}>Sign up</button>
        </div>
      </div>
      <div className='h-screen bg-blue-400'>
        <h1> hello </h1>
      </div>
   </div>

  )
}

export default Welcome
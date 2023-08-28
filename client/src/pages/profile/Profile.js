import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
function Profile() {
  const user = useSelector(state => state.user.user)

  return (
    <div className='flex ml-[15%] w-screen h-screen'>
      <div className='flex justify-between w-1/2 h-1/2'>
      {/* TODO: set up in seprate component ProfilePic finsih setup */}
        <div className='flex justify-center items-center h-32 w-32 bg-pink-200 rounded-full' >
          <p className='text-black text-6xl'>{user.name[0]}</p>
        </div>
        <div className=' flex justify-center border border-black w-1/2 mr-40'>
          <form className='flex flex-col justify-center h-auto w-auto text-xl'>
              <label>username</label>
              <input type="text" />
              <label>name</label>
              <input type="text" />
              <label>age</label>
              <input type="text" />
              <label>email address</label>
              <input type="text" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
import React from 'react'

function ProfilePic({user, color}) {

  return (
    <div className='flex justify-center items-center h-32 w-32 bg-pink-200 rounded-full' style=         {{backgroundColor: color,}}>
          {user.img? <img src={user.img} alt='profile'/> : <p className='text-black text-6xl'>{user.name[0]}</p>}
    </div>
  )
}

export default ProfilePic
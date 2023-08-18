import React from 'react'
import { useSelector } from 'react-redux'

function Groups() {
    // TODO: add createGroup form and add functionality to get all groups you are signed up for.
    const user = useSelector((state) => state.user.user)
    const groups = user.groups?.map(group => (
        <div className='flex w-40 h-40 justify-center items-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 shadow-black shadow-lg text-white text-2xl' key={group.id}>
            <span className='text-3xl font-bold'>{group.name}</span>
        </div>
    ))

  return (
    <div className='flex flex-col-2 justify-between'>
        <div className='ml-60 mt-20'>
           {groups}
        </div>
        <div className='bg-blue-500 h-screen'>
            <ul className='text-white'>
                <li>fill with task from all groups</li>
            </ul>
        </div>
    </div>
  )
}

export default Groups
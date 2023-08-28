import React from 'react'
import { useSelector } from 'react-redux'

function GroupToggle({isOpen}) {
    const user = useSelector(state => state.user.user)

    const groups = user.groups?.map(group => (
        <div key={group.id} className='flex justify-center'>
            <div className='bg-slate-700 w-1/2 h-10'>
                <h1 className='text-white font-bold'>{group.name}</h1>
            </div>
        </div>
    ))

  return (
    <div className={`fixed top-0 left-0 h-screen w-1/5 bg-gray-200 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-end'>
            <button className='w-20 h-10 rounded-lg bg-purple-400 m-3'>+ Group</button>
        </div>
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <h1 className='ml-10'>Groups</h1>
            </div>
            {groups}
        </div> 
    </div>
  )
}

export default GroupToggle
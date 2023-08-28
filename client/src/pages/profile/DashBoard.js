import React from 'react'

function DashBoard() {
  return (
    <div className='h-screen'>
        <div className='flex justify-evenly'>
            <div className='border border-red-500 w-1/4 h-40'>online users</div>
            <div className='border border-red-500 w-1/4 h-40'> notifications</div>
        </div>
        <div className='flex justify-center h-full mt-10'>
        {/* TODO: add a list of all the users events from all groups */}
            <div className='flex flex-col w-3/4 h-1/3'>
              <div className='flex-grow border border-red-500'>
                  events
              </div>
              <div className='flex-grow border border-red-500 mt-10'>
                  task
              </div>
            </div>
           
        </div>
    </div>
  )
}

export default DashBoard
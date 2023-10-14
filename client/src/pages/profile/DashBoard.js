import React from 'react'
import OnlineUsersReceiver from '../../components/OnlineUsersReceiver'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function DashBoard() {
  const groups = useSelector(state => state.groups.groups)
  const onlineUsers = useSelector(state => state.user.onlineUsers)

  const allEvents = groups?.map(group => group.widgets.Calendar)

  const eventList = allEvents.flat().map(event => (
    <li key={event.created_at}>
      <p>{event.start_date}</p>
      <p>{event.title}</p>
    </li>
  ))

  const onlineUsersList = onlineUsers?.map(user => <p key={user.id}>{user.name}</p>)
  
  return (
    <div className='h-screen'>
        <div className='flex justify-evenly'>
            <div className='border border-red-500 w-1/4 h-40'>
              <h1>Online Users</h1>
              {onlineUsersList} 
            </div>
            <div className='border border-red-500 w-1/4 h-40'> notifications</div>
        </div>
        <div className='flex justify-center h-full mt-10'>
            <div className='flex flex-col w-3/4 h-1/3'>
              <div className='flex-grow border border-red-500'>
                  events
                  <ul>
                    {eventList}
                  </ul>
              </div>
              <div className='flex-grow border border-red-500 mt-10'>
                  task
              </div>
            </div>
        </div>
        <OnlineUsersReceiver/>
    </div>
  )
}

export default DashBoard
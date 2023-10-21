import React, {useEffect, useState} from 'react'
import OnlineUsersReceiver from '../../components/OnlineUsersReceiver'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function DashBoard() {
  const [timeLine, setTimeLine] = useState('future')
  const [upcomingEvents, setUpcomingEvents] = useState(null)
  const [events, setEvents] = useState(null)

  const groups = useSelector(state => state.groups.groups)
  const onlineUsers = useSelector(state => state.user.onlineUsers)
  const user = useSelector(state => state.user.user)

  useEffect(() =>{
    const currentDate = new Date().toISOString().slice(0, 10).split('-').join('')

    const allEvents = groups?.map(group => group.widgets.Calendar)
    
    const eventArr = allEvents?.flat().filter(event => {
      const currentEventDate = parseInt(event.start_date.split('-').join(''))
      switch(timeLine){
        case 'current':
          return parseInt(currentDate) === currentEventDate
        case 'past':
          return parseInt(currentDate) > currentEventDate
        default:
          return parseInt(currentDate) < currentEventDate
      }
    })
    if (timeLine === 'future'){
      setUpcomingEvents(eventArr)
    }
    setEvents(eventArr)
  },[timeLine, groups])

  const onlineUsersList = onlineUsers?.map(user => (
    <div key={user.id} className='flex items-center space-x-2 ml-3'>
      <div className='h-2 w-2 bg-green-400 rounded-full'></div>
      <p>{user.name}</p>
    </div>
  ))

  const eventList = events?.map(event => (
    <li className='flex space-x-4 bg-blue-400 mt-3 px-2 rounded-lg' key={event.created_at}>
      <p className='w-1/4'>{event.event_group}</p>
      <p className='w-1/4'>{event.title}</p>
      <p className='w-1/4'>{event.start_date}</p> 
      <p className='w-1/4'>{event.description}</p> 
    </li>
  ))
 
  return (
    <div className='flex justify-center w-screen h-screen'>
      <div className='flex-col w-3/4 space-y-20 mt-5'>
        <div>
          <h1 className='text-5xl font-bold text-purple-400 '>{user.name}</h1>
        </div>
        <div className='flex justify-between text-lg'>
          <div className='w-auto h-auto bg-slate-700 text-white p-3 px-6 rounded-lg text-center shadow-slate-700 shadow-lg'>
            <h1 className='text-xl'>Groups</h1>
            <p>{user?.joined_groups.length}</p>
          </div>
          <div className='w-auto h-auto bg-slate-700 text-white p-3 px-6 rounded-lg text-center shadow-slate-700 shadow-lg'>
            <h1 className='text-xl'>Notifications</h1>
            {user?.received_invitations.length}
          </div>
          <div className='w-auto h-auto bg-slate-700 text-white p-3 px-6 rounded-lg text-center shadow-slate-700 shadow-lg'>
            <h1 className='text-xl'>Upcoming Events</h1>
            <p>{upcomingEvents?.length}</p>
          </div>
        </div>
        <div className='mt-5 h-auto pb-3 bg-slate-700 space-y-3 text-white rounded-lg shadow-slate-700 shadow-lg'>
         <div className='flex-row space-x-3 p-3'>
            <button className='h-auto w-auto p-2 bg-purple-400 active:bg-purple-600 hover:bg-purple-500 rounded-full' onClick={() => setTimeLine('past')}>Past Events</button>
            <button className='h-auto w-auto p-2 bg-purple-400 active:bg-purple-600 hover:bg-purple-500 rounded-full' onClick={() => setTimeLine('current')}>Current Events</button>
            <button className='h-auto w-auto p-2 bg-purple-400 active:bg-purple-600 hover:bg-purple-500 rounded-full' onClick={() => setTimeLine('future')}>FutureEvents</button>
         </div>
            <div className='flex-col pl-3 pr-3'>
              <h1 className='text-2xl font-bold mb-3'>{timeLine} events</h1>
              <ul className='text-lg'>
                <li className='flex space-x-4 mb-3 px-2 bg-slate-500'>
                  <p className='w-1/4 text-xl font-bold'>Group</p>
                  <p className='w-1/4 text-xl font-bold'>Title</p>
                  <p className='w-1/4 text-xl font-bold'>Date</p> 
                  <p className='w-1/4 text-xl font-bold'>Description</p> 
                </li>
                {eventList}
              </ul>
            </div>
        </div>
      </div>
      <div className='fixed right-0 w-30 mr-5 mt-5'>
        <div className='flex-col space-y-3'>
          <div className='flex-col text-center h-auto bg-slate-700 text-white px-3 pt-3 pb-10 text-lg shadow-slate-700 shadow-lg rounded-lg'>
            <h1 className='text-xl'>Online Users</h1>
            {onlineUsersList} 
          </div>
        </div>
      </div>
      <OnlineUsersReceiver/>
    </div>
  )
}

export default DashBoard
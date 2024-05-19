import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSendInvitationMutation } from '../../api/groupApi'
import Calendar from '../../components/group/Calendar'
import EventDateForm from '../../components/group/EventDateForm'

function Group({ allUsers , refetch }) {
  const [filteredUsers, setFilteredUsers] = useState(allUsers)
  const [search, setSearch] = useState('')
  const [displayed, setDisplayed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [eventOpen, setEventOpen]= useState(false)
  const [eventArg, setEventArg] = useState(null)
 
  const ref = useRef()

  const {groupId} = useParams()
  const groups = useSelector(state => state.groups.groups)
  

  const group = groups?.find(group => group.id === parseInt(groupId))

  const [sendInvite] = useSendInvitationMutation()

  const userList = (group?.users.length > 0)? group.users.map(user => <li key={user.id}>{user.username}</li>) : null
  
  const filteredUsersList = filteredUsers?.map(user =>
    <div key={user.id} className='flex justify-between'>
      <li className='text-white pl-2'>{user.name}</li>
      <button className='text-white pr-3' onClick={() => sendInvite({
        recipient_id: user.id,
        group_name: group.group_name,
        group_id: group.id
      })}>Invite</button>
    </div> )

  useEffect(() => {
    setFilteredUsers(allUsers?.filter(user => user.name.toUpperCase().includes(search.toUpperCase())))
  },[search, allUsers])

  useEffect(() => {
    const closeInvites = (e) => {
      if (!ref.current?.contains(e.target) && e.target !== document.querySelector('.invite-button')){
        setDisplayed(false)
      }
    }

    document.addEventListener('mousedown', closeInvites)

    return () => {
      document.removeEventListener('mousedown', closeInvites)
    }
  },[])

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='h-screen w-screen overflow-hidden bg-slate-900 text-white'>
      <div className="flex items-start mt-3 mb-10">
        <div className="flex-grow flex justify-end items-start w-1/2 ml-20">
          <p className='text-4xl font-bold'>{group?.group_name}</p>
        </div>
        <div className="flex-grow flex justify-end items-start w-1/2 mr-5">
          <button className=' w-auto h-auto bg-blue-400 rounded-lg px-2 py-1 invite-button' onClick={() => setDisplayed(!displayed) & refetch()}>Invite 🔍</button>
        </div>
      </div>
      {displayed?
        <div ref={ref} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-slate-600 z-20 ">
            <div className='relative flex-col items-center'>
              <input value={search} onChange={onChange} placeholder='Search...' className='w-full mb-2' />
              <ul >
                {filteredUsersList}
              </ul>
            </div>
          </div>
          : null}
        <div className='flex justify-end h-auto'>
          <div className='flex justify-center w-screen'>
            <Calendar group={group} setIsOpen={setIsOpen} isOpen={isOpen} setEventArg={setEventArg} eventOpen={eventOpen} setEventOpen={setEventOpen} />
          </div>
          <div className='flex-col  bg-slate-700 w-[10%] h-52 mr-5 mt-5 justify-center rounded-lg shadow-black shadow-xl'>
            <h1 className=' text-lg font-bold text-center'>Users</h1>
            <ul className='flex-col text-center'>
              {userList}
            </ul>
          </div>
        </div>
        {isOpen? <EventDateForm eventArg={eventArg} group={group} setIsOpen={setIsOpen}/> : null}
        {eventOpen? 
          <div className='flex justify-center h-1/3 w-screen bg-slate-800 text-white'>
            <h1>{eventArg.event.title}</h1>
            <h2>{eventArg.event.extendedProps.description}</h2>
          </div> 
          : null
        }
    </div>
  )
}

export default Group
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSendInvitationMutation } from '../../api/groupApi'
import Calendar from '../../components/Calendar'
import EventDateForm from '../../components/EventDateForm'


function Group({ allUsers }) {
  const [filteredUsers, setFilteredUsers] = useState(allUsers)
  const [search, setSearch] = useState('')
  const [displayed, setDisplayed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [eventArg, setEventArg] = useState(null)
  
  const {groupId} = useParams()
  const user = useSelector(state => state.user.user)
  const userGroups = useSelector(state => state.groups.groups)
  

  const group = userGroups?.find(group => group.id === parseInt(groupId))
  const [sendInvite] = useSendInvitationMutation()
  const userList = (group.users.length > 0)? group.users.map(user => <li key={user.id}>{user.username}</li>) : null
  
  const filteredUsersList = filteredUsers?.map(user =>
    <div key={user.id} className='flex justify-between'>
      <li className='text-white pl-2'>{user.name}</li>
      <button className='text-white pr-3' onClick={() => sendInvite({
        recipient_id: user.id,
        group_name: group.name,
        group_id: group.id
      })}>Invite</button>
    </div> )

  useEffect(() => {
    setFilteredUsers(allUsers?.filter(user => user.name.toUpperCase().includes(search.toUpperCase())))
  },[search, allUsers])

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='h-screen w-screen'>
      <div className="flex items-start">
        <div className="flex-grow flex justify-end items-start w-1/2 ml-20">
          <p className='text-3xl font-bold'>{group.name}</p>
        </div>
        <div className="flex-grow flex justify-end items-start w-1/2 mr-5">
          <button onClick={() => setDisplayed(!displayed)}>Invite 🔍</button>
        </div>
      </div>
      {displayed?
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-slate-600 z-20 ">
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
            <Calendar group={group} setIsOpen={setIsOpen} isOpen={isOpen} setEventArg={setEventArg} />
          </div>
          <div className='flex-col border border-black w-[10%] h-52 mr-5 mt-5 justify-center'>
            <h1 className=' text-lg font-bold text-center'>Users</h1>
            <ul className='flex-col text-center'>
              {userList}
            </ul>
          </div>
        </div>
        {isOpen? <EventDateForm eventArg={eventArg} group={group}/> : null}
    </div>
  )
}

export default Group
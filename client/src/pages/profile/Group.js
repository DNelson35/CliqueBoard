import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSendInvitationMutation } from '../../api/groupApi'


function Group({ allUsers }) {
  const [filteredUsers, setFilteredUsers] = useState(allUsers)
  const [search, setSearch] = useState('')
  const [displayed, setDisplayed] = useState(false)
  const {groupId} = useParams()
  const user = useSelector(state => state.user.user)

  const group = user.groups?.find(group => group.id === parseInt(groupId))
  const [sendInvite] = useSendInvitationMutation()

  const usersList = filteredUsers?.map(user =>
    <div key={user.id} className='flex justify-between'>
      <li className='text-white pl-2'>{user.name}</li>
      <button className='text-white pr-3' onClick={() => sendInvite({
        recipient_id: user.id,
        group_name: group.name
      })}>Invite</button>
    </div> )

  useEffect(() => {
    setFilteredUsers(allUsers?.filter(user => user.name.toUpperCase().includes(search.toUpperCase())))
  },[search, allUsers])

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='h-screen'>
      <div className="flex items-start">
        <div className="flex-grow flex justify-end items-start w-1/2 ml-20">
          <p>{group.name}</p>
        </div>
        <div className="flex-grow flex justify-end items-start w-1/2 mr-5">
          <button onClick={() => setDisplayed(!displayed)}>Invite 🔍</button>
        </div>
      </div>
      {displayed?
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-slate-600 ">
            <div className='relative flex-col items-center'>
              <input value={search} onChange={onChange} placeholder='Search...' className='w-full mb-2' />
              <ul>
                {usersList}
              </ul>
            </div>
          </div>
          : null}
    </div>
  )
}

export default Group
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Messenger() {
  const [searchInput, setSearchInput] = useState('')
  const [filterResults, setFilterResults] = useState({
    groupList: [],
    userList: []
  })
  const groups = useSelector(state => state.groups.groups)

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
  
    if (searchInput !== ''){
      const groupArr = groups.filter(group => {
        if (group.name.toLowerCase().includes(searchInput)){
          return group
        } else {
          return null
        }
      })

      const userArr = groups.map(group => {
        return group.users.filter(user => {
          if(user.username.toLowerCase().includes(searchInput.toLowerCase())){
            return user
          } else {
            return null
          }
        })
      }).flat().filter((user, index, self) => {
        return index === self.findIndex((u) => (u.id === user.id));
      });
      

      setFilterResults({
        groupList: groupArr,
        userList: userArr
      })
    } else {
      setFilterResults({
        groupList: [],
        userList: []
      })
    }
  
  }, [groups, searchInput]);
  
  
  console.log(filterResults)

  const userFilter = filterResults.userList?.map(user => <li key={user.id}>{user.username}</li>)
  const groupsFilter = filterResults.groupList?.map(group => <li key={group.id}>{group.name}</li>)

  return (
    <div className='flex h-screen w-screen'>
      <div className='flex flex-col w-1/4 h-screen border border-red-500'>
        <div className='flex flex-col items-center'>
          <h1>Messenger</h1>
          <input className='w-3/5 ml-6 pl-3' value={searchInput} placeholder='search for people and groups...' onChange={handleChange}/>
          <ul>
            {groupsFilter}
            {userFilter}
          </ul>
        </div>
      </div>
      <div className='flex flex-col w-3/4 h-screen border border-red-500'>
        <h1 className='flex justify-center'>Start a conversation</h1>
      </div>
    </div>
  )
}

export default Messenger
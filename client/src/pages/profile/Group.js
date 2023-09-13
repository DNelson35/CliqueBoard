import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


function Group() {
  const {groupId} = useParams()
  const user = useSelector(state => state.user.user)

  const group = user.groups?.find(group => group.id === parseInt(groupId))

  return (
    <div className='flex justify-center'>{group.name}</div>
  )
}

export default Group
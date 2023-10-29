import React, { useEffect, useState } from 'react'
import { useDeleteInvitationMutation, useJoinGroupMutation } from '../api/groupApi'
import { useDispatch } from 'react-redux'
import { addGroupToUser, deleteInvite } from '../reducers/userSlice'
import { joinedGroup } from '../reducers/groupSlice'
import { addConversation } from '../reducers/conversationSlice'

function Notification({note}) {
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState({
      access_code: ''
    })
    const dispatch = useDispatch()
    const [deleteInvitation] = useDeleteInvitationMutation()
    const [joinGroup] = useJoinGroupMutation()
    
    useEffect(() => {
      const closeNotifications = (e) => {
        if(e.target.classList.contains('notification-icon')){
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', closeNotifications)
      return () => {
        document.removeEventListener('mousedown', closeNotifications)
      }
    }, [])

    const onChange = (e) => {
      setCode({...code, access_code: e.target.value})
    }

    const handleDelete = () => {
      deleteInvitation(note.id)
      dispatch(deleteInvite(note.id))
    }

    const handleJoin = async (e) => {
      e.preventDefault()
      const newGroup = await joinGroup(code)
      if (newGroup.data){
        dispatch(joinedGroup(newGroup.data))
        dispatch(addGroupToUser(newGroup.data))
        dispatch(addConversation(newGroup.data.conversation))
      }
    }

  return (
    <div className='flex text-justify ml-20 mb-2 notification'>
      <button className='flex text-white w-1/4 h-5 rounded-full bg-red-500 justify-center items-center pb-1 self-center' onClick={handleDelete}>x</button>
      <div className=' text-justify ml-3 mb-1 p-2 border border-black rounded-lg bg-white'>
          <p className={` font-medium tracking-tighter mb-2 ${open? '' : 'line-clamp-1'}`} onClick={() => setOpen(!open)}>{ note.message }</p>
          {open?
            <form onSubmit={handleJoin} className='flex space-x-3'>
              <input value={code.access_code} onChange={onChange} className=' border border-purple-300 focus:outline-purple-400 ' placeholder='enter key' autoFocus />
              <button type='submit' className='w-auto h-auto rounded-2xl bg-blue-400 py-1 px-3 text-white hover:bg-blue-500 active:bg-blue-600'>Join</button>
            </form>
           :
            null
          }
          
      </div>
    </div>
  )
}

export default Notification
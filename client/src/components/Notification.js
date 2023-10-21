import React, { useEffect, useRef, useState } from 'react'
import { useDeleteInvitationMutation, useJoinGroupMutation } from '../api/groupApi'
import { useDispatch } from 'react-redux'
import { addGroupToUser, deleteInvite } from '../reducers/userSlice'

function Notification({note}) {
    const [open, setOpen] = useState(false)
    const [openInput, setOpenInput] = useState(false)
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
      console.log(newGroup.data)
      dispatch(addGroupToUser(newGroup.data))
    }

  return (
    <div className='flex text-justify ml-20 mb-2 notification'>
      <button className='flex text-white w-1/4 h-5 rounded-full bg-red-500 justify-center items-center pb-1 self-center' onClick={handleDelete}>x</button>
      <div className=' text-justify ml-3 mb-1 pr-2 pl-2 border border-black rounded-lg bg-white' onClick={() => setOpen(!open)}>
          <p className={` font-medium tracking-tighter ${open? '' : 'line-clamp-1'}`}>{ note.message }<button className='relative w-12 h-auto bg-purple-400 rounded-full' onClick={() => setOpenInput(!openInput)}>join</button></p>
          {openInput? 
          <form onSubmit={handleJoin}>
            <input value={code.access_code} onChange={onChange} />
            <button type='submit'/>
          </form>
          : null}
      </div>
    </div>
  )
}

export default Notification
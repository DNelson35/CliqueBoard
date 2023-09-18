import React, { useState } from 'react'
import { useDeleteInvitationMutation } from '../api/groupApi'
import { useDispatch } from 'react-redux'
import { deleteInvite } from '../reducers/userSlice'

function Notification({note}) {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [deleteInvitation] = useDeleteInvitationMutation()

    const handleDelete = () => {
      deleteInvitation(note.id)
      dispatch(deleteInvite(note.id))
    }

  return (
    <div className='flex text-justify ml-20 mb-2'>
      <button className='flex text-white w-1/4 h-5 rounded-full bg-red-500 justify-center items-center pb-1 self-center' onClick={handleDelete}>x</button>
      <div className='flex text-justify ml-3 mb-1 pr-2 pl-2 border border-black rounded-lg bg-white' onClick={() => setOpen(!open)}>
          <p className={`font-bold tracking-tighter ${open? '' : 'line-clamp-1'}`}>{ note.message }</p>
      </div>
    </div>
  )
}

export default Notification
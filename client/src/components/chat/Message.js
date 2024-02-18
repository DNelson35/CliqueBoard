import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { useDeleteMessageMutation, useUpdateMessageMutation } from '../../api/messengerApi'

function Message({message, user, chat}) {
    const [deleteMessage] = useDeleteMessageMutation()
    const [updateMessage] = useUpdateMessageMutation()
    const [edit, setEdit] = useState(false)
    const [newMessage, setNewMessage] = useState({
        id: message.id,
        chat_id: chat.id,
        body: message.body,
    })

    const handleUpdate = (e) => setNewMessage({...newMessage, body: e.target.value})
    
    const handleSubmit = (e) => {
        e.preventDefault()
        updateMessage(newMessage)
        setEdit(false)
    }

    const editForm = (
        <form onSubmit={handleSubmit}>
            <input type="text" className='bg-blue-400 text-white placeholder-white outline-none' value={newMessage.body} onChange={handleUpdate} />
            <button type='submit'/>
        </form>
    )

  return (message.user_id === user.id)? (
    <li className='flex justify-end h-auto m-1 mr-3 group' key={message.id}>
        <div className='flex justify-center items-center w-auto h-auto bg-blue-400 rounded-lg p-3 text-xl max-w-[50%] text-white'>
            {edit? editForm: message.body}
        </div>
        <button className='hidden group-hover:block bg-red-400 rounded-full h-5 w-5 -translate-x-10 -translate-y-1'>
            <div onClick={() => deleteMessage(message)} className='flex justify-center items-center h-full w-full'>
                x
            </div>
        </button>
        <button className='hidden group-hover:block bg-green-400 rounded-full h-5 w-5 -translate-x-9 -translate-y-1 p-1' onClick={() => setEdit(!edit)}>
            <div className='flex justify-center items-center h-full w-full'>
                <FiEdit2/>
            </div>
        </button>
    </li>
  ) : (
    <li className='flex justify-start h-auto m-1 ml-3' key={message.id}>
        <p className='flex justify-center items-center w-auto h-auto bg-purple-400 rounded-lg p-3 text-xl max-w-[50%] text-white'>
            {message.body}
        </p>
    </li>
  )

}

export default Message
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useCreateMessageMutation, useCreateConversationMutation } from '../api/authApi'
import { addConversation, setConversation } from '../reducers/userSlice'
import useChatScroll from '../hooks/useChatScroll'

function Chat({ recipient, chatType, user, conversation }) {

  const [message, setMessage] = useState({
    id: '',
    body: '',
    group_id: '',
    chat_type: '',
    user2_id: '',
  })
  const [createMessage] = useCreateMessageMutation()
  const [createConversation] = useCreateConversationMutation()
  const ref = useChatScroll(conversation?.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    if (conversation){
      setMessage({
        id: conversation.id,
        body: '',
      })
    }else if(chatType === 'Group'){
      setMessage({
        group_id: recipient.id,
        body: '',
        chat_type: chatType,
        user2_id: null,
      })
    } else {
      setMessage({
        user2_id: recipient.id,
        body: '',
        chat_type: chatType,
        group_id: null,
      })
    }
  },[conversation, chatType, recipient?.id]) 

  const handleSubmitChat = async (e) => {
    e.preventDefault()
    const newConversation = await createConversation(message)
    if(newConversation.error){
      console.log(newConversation.error.data.chat)
      dispatch(setConversation(newConversation.error.data.chat))
    } else {
      dispatch(addConversation(newConversation.data))
      dispatch(setConversation(newConversation.data))
    }
    setMessage({...message, body: ''})
  }

  const handleSubmitMessage = async (e) => {
    e.preventDefault()
    await createMessage(message)
    setMessage({...message, body: ''})
  }

  const handleChatInput = (e) => {
    setMessage((message) => ({ ...message, body: e.target.value }))
  }

  const chatMessages = conversation?.messages.map(message => {
    if (message.user_id === user.id){
      return ( 
        <li className='flex justify-end h-auto m-1 mr-3' key={message.id}>
          <p className='flex justify-center items-center w-auto h-auto bg-blue-400 rounded-lg p-3 text-xl max-w-[50%] text-white'>{message.body}</p>
        </li>
      )
    } else {
      return (
        <li className='flex justify-start h-auto m-1 ml-3' key={message.id}>
          <p className='flex justify-center items-center w-auto h-auto bg-purple-400 rounded-lg p-3 text-xl max-w-[50%] text-white'>{message.body}</p>
        </li>
      ) 
    }
  })

  return (
    <div>
      <h1>{recipient?.username || recipient?.name}</h1>
      <ul ref={ref} className='flex flex-col w-full h-screen pb-20 overflow-auto scroll-smooth'>
        {chatMessages}
      </ul>
      <div className='fixed bottom-0 w-full h-20 border-l-2 border-slate-600 bg-slate-700 opacity-90'>
        <form onSubmit={conversation? handleSubmitMessage : handleSubmitChat} className='flex justify-center mr-[25%] h-[70%]'>
          <input type='text' placeholder='Start typing...' value={message.body} onChange={handleChatInput} className='mt-3 w-3/4 text-xl'/>
          <button type='submit' className='flex justify-center h-10 w-auto bg-blue-400 text-white rounded-lg mt-3 p-3 ml-3 items-center'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useCreateMessageMutation, useCreateConversationMutation } from '../api/authApi'
import { addConversation } from '../reducers/conversationSlice'
import useChatScroll from '../hooks/useChatScroll'
import { useDeleteMessageMutation } from '../api/messengerApi'

function Chat({ recipient, chatType, user, chat, setChat, conversations }) {

  let conversation = conversations.find(conversation => conversation.id === chat?.id)
  
  const [message, setMessage] = useState({
    id: '',
    body: '',
    group_id: '',
    chat_type: '',
    user2_id: '',
  })
  const [createMessage] = useCreateMessageMutation()
  const [createConversation] = useCreateConversationMutation()
  const [deleteMessage] = useDeleteMessageMutation()
  const ref = useChatScroll(conversation?.messages, chat)
  const dispatch = useDispatch()

  useEffect(() => {
    if (chat){
      setMessage({
        id: chat.id,
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
  },[chat, chatType, recipient?.id]) 

  const handleSubmitChat = async (e) => {
    e.preventDefault()
    const newConversation = await createConversation(message)
    if(newConversation.error){
      setChat(newConversation.error.data.chat)
    } else {
      dispatch(addConversation(newConversation.data))
      setChat(newConversation.data)
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

  const chatMessages = conversation?.messages?.map(message => {
    if (message.user_id === user.id){
      return ( 
        <li className='flex justify-end h-auto m-1 mr-3 group' key={message.id}>
          <p className='flex justify-center items-center w-auto h-auto bg-blue-400 rounded-lg p-3 text-xl max-w-[50%] text-white'>{message.body}</p>
          <button className='hidden group-hover:block bg-red-400 rounded-full h-5 w-5 -translate-x-4 -translate-y-1'>
            <div onClick={() => deleteMessage(message)} className='flex justify-center items-center h-full w-full'>
              x
            </div>
          </button>
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

  const chatTitle = () => {
    if(conversation && conversation.chat_type === 'Group'){
      return conversation.title2
    }else if(conversation && conversation.title1.toLowerCase() === user.username.toLowerCase()){
      return conversation.title2
    }else if(conversation && conversation.title1.toLowerCase() !== user.username.toLowerCase()){
      return conversation.title1
    }else if(recipient.username){
      return recipient.username
    }else {
      return recipient.name
    }
  }
  
  return (
    <div>
      <h1 className='text-3xl text-slate-900 text-center'>{chatTitle()}</h1>
      <ul ref={ref} className='flex flex-col w-full h-screen pb-20 overflow-auto scroll-smooth'>
        {chatMessages}
      </ul>
      <div className='fixed bottom-0 w-full h-20 border-l-2 border-slate-600 bg-slate-700 opacity-90'>
        <form onSubmit={chat? handleSubmitMessage : handleSubmitChat} className='flex justify-center mr-[25%] h-[70%]'>
          <input type='text' placeholder='Start typing...' value={message.body} onChange={handleChatInput} className='mt-3 w-3/4 text-xl'/>
          <button type='submit' className='flex justify-center h-10 w-auto bg-blue-400 text-white rounded-lg mt-3 p-3 ml-3 items-center'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
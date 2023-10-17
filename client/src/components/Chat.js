import React, {useEffect, useState} from 'react'
import { useCreateMessageMutation } from '../api/authApi'
import { useCreateConversationMutation } from '../api/authApi'

function Chat({ recipient, chatType, user, conversation }) {

  const [message, setMessage] = useState({})
  const [createMessage] = useCreateMessageMutation()
  const [createConversation] = useCreateConversationMutation()


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
   const data = await createConversation(message)
   console.log(data)
  }

  const handleSubmitMessage = async (e) => {
    e.preventDefault()
    const response = await createMessage(message)
    console.log(response)
  }

  const handleChatInput = (e) => {
    setMessage((message) => ({ ...message, body: e.target.value }))
  }

  const chatMessages = conversation?.messages.map(message => <li className={`flex justify-${message.user_id === user.id ? 'end' : 'start'}`} key={message.id}>{message.body}</li>)

  return (
    <div>
      <h1>{recipient?.username || recipient?.name}</h1>
      <ul>
        {chatMessages}
      </ul>
      <form onSubmit={conversation? handleSubmitMessage : handleSubmitChat}>
        <input type='text' placeholder='Start typing...' onChange={handleChatInput}/>
        <button type='submit'></button>
      </form>
    </div>
  )
}

export default Chat
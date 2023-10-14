import React, {useState} from 'react'
import { useCreateMessageMutation } from '../api/authApi'

function Chat({ recipient, user }) {
  const [message, setMessage] = useState({ recipient_id: recipient.id, body: '' })
  const [createMessage] = useCreateMessageMutation()

  const conversation = user.conversations.find(chat => chat.title1 || chat.title2 === recipient.name || recipient.username )

  // console.log(conversation)
  console.log(recipient)

  const handleSubmitChat = async (e) => {
    e.preventDefault()
    await createMessage(message)
  }

  const handleChatInput = (e) => {
    setMessage((prevState) => ({ ...prevState, body: e.target.value }))
  }

  return (
    <div>
      <h1>{recipient.username || recipient.name}</h1>
      <p>reciver</p>
      <form onSubmit={handleSubmitChat}>
        <input type='text' placeholder='Start typing...' onChange={handleChatInput}/>
        <button type='submit'></button>
      </form>
    </div>
  )
}

export default Chat
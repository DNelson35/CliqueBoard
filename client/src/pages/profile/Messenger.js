import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../../components/Chat'

function Messenger({allUsers}) {

  const conversations = useSelector(state => state.conversations.conversations)
  
  const [searchInput, setSearchInput] = useState('')
  const [filterResults, setFilterResults] = useState([])
  const [recipient, setRecipient] = useState({
    data: '',
    chat_type: '',
  })
  const [chat, setChat] = useState({})
  
  const currentUser = useSelector((state) => state.user.user)

  const handleChange = (e) => setSearchInput(e.target.value)
 
  useEffect(() => {
    if (searchInput !== '' && allUsers) {
      const matchingUsers = allUsers.filter(user => user.id !== currentUser.id && user.username.toLowerCase().includes(searchInput.toLowerCase()))

      setFilterResults(matchingUsers)
    }else{
      setFilterResults([])
    }
      
  }, [currentUser.id, allUsers, searchInput])

  const handleSelectedEntity = (data, chatType) => {
    setRecipient({
      data,
      chat_type: chatType,
    })

    setChat(null)
  }

  const handleConversationSelect = (data) => {
    setChat(data)
    setRecipient(null)
  }

  const userFilter = filterResults?.map((user) => (
    <li key={user.id} onClick={() => handleSelectedEntity(user, 'User')}>
      {user.username}
    </li>  
  ))

  const conversationList = conversations?.map((conversation) => {
        if (conversation.chat_type === 'User'){
          return (
            <li key={conversation.id} onClick={() => handleConversationSelect(conversation)}>
              {conversation.title1.toLowerCase() === currentUser.username.toLowerCase() ? conversation.title2 : conversation.title1}
            </li>
          )
        } else {
          return (
            <li key={conversation.id} onClick={() => handleConversationSelect(conversation)}>
              {conversation.title2}
            </li>
          )
        }   
    }
  )

  return (
    <div className='flex h-screen w-screen'>
      <div className='fixed flex flex-col w-1/4 h-screen bg-slate-600'>
        <div className='flex flex-col items-center text-white'>
          <h1>Messenger</h1>
          <input className='w-3/5 ml-6 pl-3 text-black' value={searchInput} placeholder='search for people and groups...' onChange={handleChange}/>
          <ul>
            {userFilter}
          </ul>
          <h1>Conversations</h1>
          <ul>
            {conversationList}
          </ul>
        </div>
      </div>
      <div className='flex flex-col w-3/4 h-screen ml-[25%] bg-slate-900'>
        {recipient?.data || chat.id ? 
        <>
          <Chat  recipient={recipient?.data} chatType={recipient?.chat_type} chat={chat} user={currentUser} setChat={setChat} conversations={conversations} />
        </>
        : 
        <h1 className='flex justify-center text-white font-semibold text-3xl'>Start a conversation</h1>}
      </div>
    </div>
  )
}

export default Messenger
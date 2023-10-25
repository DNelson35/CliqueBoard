import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../../components/Chat'
import { useMembersQuery } from '../../api/authApi'
import { setConversation } from '../../reducers/userSlice'
import { useDispatch } from 'react-redux'

function Messenger() {
  const [searchInput, setSearchInput] = useState('')
  const [filterResults, setFilterResults] = useState({ groupList: [], userList: [] })
  const [recipient, setRecipient] = useState({
    data: '',
    chat_type: '',
  })
  
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.groups.groups)
  const currentUser = useSelector((state) => state.user.user)
  const {data: members} = useMembersQuery()
  const conversation = useSelector((state) => state.user.conversation)

  const handleChange = (e) => setSearchInput(e.target.value)
  // TODO: the way i currently handle the group needs to be changed. as of the moment i cant broadcast group messages to other users in that group and evnen if i could it would go away on refresh.

  // TODO: the best solution i have right now is to instead have the group return a conversation and get rid of the group search. so i can have the backend send down the conversation for every group the user is a member of and display it in the conversation list automaticly so you never need to search for the conversation. this should also reduce some of the complex logic. i can have it so when a group is created the conversation is automaticly created with it and all members are automaticly subscribed to the messages for that group. then in the message board i would simply show in the conversations the conversation for each group you are a member of and have the search be specifficly for users search and creating conversations with a user.
  
  useEffect(() => {
    if (searchInput !== '' && members) {
      const groupArr = groups?.filter((group) => group.group_name.toLowerCase().includes(searchInput))
      const userArr = members?.filter((user) => user.username.toLowerCase().includes(searchInput.toLowerCase()))

      setFilterResults({ groupList: groupArr, userList: userArr })
    } else {
      setFilterResults({ groupList: [], userList: [] })
    }
  }, [groups, searchInput, members])

  const handleSelectedEntity = (data, chatType) => {
    setRecipient({
      data,
      chat_type: chatType,
    })

    dispatch(setConversation(null))
  }

  const handleConversationSelect = (data) => {
    dispatch(setConversation(data))
    setRecipient(null)
  }

  const userFilter = filterResults.userList?.map((user) => {
    if (user.username !== currentUser.username) {
      return (
        <li key={user.id} onClick={() => handleSelectedEntity(user, 'User')}>
          {user.username}
        </li>
      )
    } else {
      return null
    }
    
})

  const groupsFilter = filterResults.groupList?.map((group) => (
    <li key={group.id} onClick={() => handleSelectedEntity(group, 'Group')}>
      {group.group_name}
    </li>
  ))

  const conversationList = currentUser?.conversations.map((conversation) => (
    <li key={conversation.id} onClick={() => handleConversationSelect(conversation)}>
      {conversation.title1 === currentUser.username ? conversation.title2 : conversation.title1}
    </li>
  ))
  
  return (
    <div className='flex h-screen w-screen'>
      <div className='fixed flex flex-col w-1/4 h-screen bg-slate-600'>
        <div className='flex flex-col items-center text-white'>
          <h1>Messenger</h1>
          <input className='w-3/5 ml-6 pl-3 text-black' value={searchInput} placeholder='search for people and groups...' onChange={handleChange}/>
          <ul>
            {groupsFilter}
            {userFilter}
          </ul>
          <h1>Conversations</h1>
          <ul>
            {conversationList}
          </ul>
        </div>
      </div>
      <div className='flex flex-col w-3/4 h-screen ml-[25%]'>
        {recipient?.data || conversation ? 
        <>
          <Chat recipient={recipient?.data} chatType={recipient?.chat_type} conversation={conversation} user={currentUser}/>
        </>
        : 
        <h1 className='flex justify-center'>Start a conversation</h1>}
      </div>
    </div>
  )
}

export default Messenger
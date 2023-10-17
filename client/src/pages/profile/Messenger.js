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
  // const [conversation, setConversation] = useState(null)
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.groups.groups)
  const user = useSelector((state) => state.user.user)
  const {data: members} = useMembersQuery()
  const conversation = useSelector((state) => state.user.conversation)

  const handleChange = (e) => setSearchInput(e.target.value)

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

    setConversation(null)
  }

  const handleConversationSelect = (data) => {
    // setConversation(data)
    dispatch(setConversation(data))
    setRecipient(null)
  }

  const userFilter = filterResults.userList?.map((user) => (
    <li key={user.id} onClick={() => handleSelectedEntity(user, 'User')}>
      {user.username}
    </li>
  ))

  const groupsFilter = filterResults.groupList?.map((group) => (
    <li key={group.id} onClick={() => handleSelectedEntity(group, 'Group')}>
      {group.group_name}
    </li>
  ))

  const conversationList = user?.conversations.map((conversation) => (
    <li key={conversation.id} onClick={() => handleConversationSelect(conversation)}>
      {conversation.title1 === user.username ? conversation.title2 : conversation.title1}
    </li>
  ))

  return (
    <div className='flex h-screen w-screen'>
      <div className='flex flex-col w-1/4 h-screen border border-red-500'>
        <div className='flex flex-col items-center'>
          <h1>Messenger</h1>
          <input className='w-3/5 ml-6 pl-3' value={searchInput} placeholder='search for people and groups...' onChange={handleChange}/>
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
      <div className='flex flex-col w-3/4 h-screen border border-red-500'>
        {recipient?.data || conversation ? 
        <>
          <Chat recipient={recipient?.data} chatType={recipient?.chat_type} conversation={conversation} user={user}/>
        </>
        : 
        <h1 className='flex justify-center'>Start a conversation</h1>}
      </div>
    </div>
  )
}

export default Messenger
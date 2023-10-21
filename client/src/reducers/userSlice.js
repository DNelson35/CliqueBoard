import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../api/authApi'

const initialState = {
  user: null,
  onlineUsers: null,
  conversation: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    addGroupToUser: (state, action) => {
      state.user.joined_groups.push(action.payload)
    },
    addInvite: (state, action) => {
      state.user.received_invitations.push(action.payload)
    },
    deleteInvite: (state, action) => {
      state.user.received_invitations =  state.user.received_invitations.filter(invite => parseInt(invite.id) !== action.payload)
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    },
    setConversation: (state, action) => {
      if(action.payload !== null){
        const chat = state.user.conversations.find(chat => chat.id === action.payload.id)
        state.conversation = chat
      }else {
        state.conversation = null
      }
      
    },
    addMessage: (state, action) => {
      const chat = state.user.conversations.find(chat => chat.id === state.conversation.id)
      chat.messages.push(action.payload)
      state.conversation.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, {payload}) => {
        state.user = payload
      }
    )
    builder.addMatcher(
      userApi.endpoints.checkUser.matchFulfilled,
      (state, {payload}) => {
        state.user = payload
      }
    )
    builder.addMatcher(
      userApi.endpoints.signOutUser.matchFulfilled,
      (state, {payload}) => {
        state.user = null
      }
    )
    builder.addMatcher(
      userApi.endpoints.signUpUser.matchFulfilled,
      (state, {payload}) => {
        state.user = payload
      }
    )
  }
})

export const { setUser, addGroupToUser, addInvite, deleteInvite, setOnlineUsers, setConversation, addMessage } = userSlice.actions
export default userSlice.reducer
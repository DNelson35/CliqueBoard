import { createSlice } from '@reduxjs/toolkit'
import { messengerApi } from '../api/messengerApi'

const initialState = {
    conversations: []
}

const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addConversation: (state, action) => {
            console.log(action.payload)
            state.conversations.push(action.payload)
        },
        addMessage: (state, action) => {
            console.log(action.payload)
            const chat = state.conversations.find(conversation => conversation.id === action.payload.conversation_id)
            chat.messages.push(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder.addMatcher(
           messengerApi.endpoints.getConversations.matchFulfilled,
           (state, {payload}) => {
            state.conversations = payload
           }
        )
    }
})

export const {addConversation, addMessage} = conversationSlice.actions
export default conversationSlice.reducer
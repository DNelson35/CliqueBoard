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
            state.conversations.push(action.payload)
        },
        addMessage: (state, action) => {
            const chat = state.conversations.find(conversation => conversation.id === action.payload.conversation_id)
            chat.messages.push(action.payload)
        },
        deleteMessage: (state, action) => {
            const chat = state.conversations.find(chat => chat.id === action.payload.chat_id)
            const messages = chat.messages.filter(message => message.id !== action.payload.message_id)
            chat.messages = messages
        },
        updateMessage: (state, action) => {
            const chat = state.conversations.find(chat => chat.id === action.payload.chat_id)
            const messages = chat.messages.map(message => {
                if(message.id !== action.payload.message.id){
                    return message
                } else {
                    return action.payload.message
                }
            })
            chat.messages = messages
        },

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

export const {addConversation, addMessage, deleteMessage, updateMessage} = conversationSlice.actions
export default conversationSlice.reducer
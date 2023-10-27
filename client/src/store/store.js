import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice'
import groupReducer from '../reducers/groupSlice'
import conversationReducer from '../reducers/conversationSlice'
import { userApi } from '../api/authApi'
import { groupApi } from '../api/groupApi'
import { messengerApi } from '../api/messengerApi'

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    groups: groupReducer,
    [groupApi.reducerPath]: groupApi.reducer,
    conversations: conversationReducer,
    [messengerApi.reducerPath]: messengerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      groupApi.middleware,
      messengerApi.middleware
    ),
})

export default store
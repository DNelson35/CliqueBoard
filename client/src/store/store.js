import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice'
import groupReducer from '../reducers/groupSlice'
import { userApi } from '../api/authApi'
import { groupApi } from '../api/groupApi'

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    groups: groupReducer,
    [groupApi.reducerPath]: groupApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      groupApi.middleware
    ),
})

export default store
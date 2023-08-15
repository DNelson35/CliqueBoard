import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import { userApi } from '../api/authSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
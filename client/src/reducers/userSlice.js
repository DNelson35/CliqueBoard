import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/authApi';

const initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    addGroupToUser: (state, action) => {
      state.user.groups.push(action.payload)
      console.log(action.payload)
    },
    addInvite: (state, action) => {
      state.user.received_invitations.push(action.payload)
    }
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
});

export const { setUser, addGroupToUser, addInvite } = userSlice.actions;
export default userSlice.reducer;
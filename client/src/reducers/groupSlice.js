import { createSlice } from '@reduxjs/toolkit';
import { groupApi } from '../api/groupApi';

const initialState = {
  groups: null,
}

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      groupApi.endpoints.getGroups.matchFulfilled,
      (state, {payload}) => {
        state.groups = payload
      }
    )
    builder.addMatcher(
      groupApi.endpoints.createGroups.matchFulfilled,
      (state, {payload}) => {
        state.groups = {...state.groups, payload}
      }
    ) 
  }
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
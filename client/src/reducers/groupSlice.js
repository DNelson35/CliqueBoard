import { createSlice } from '@reduxjs/toolkit'
import { groupApi } from '../api/groupApi'
import { userApi } from '../api/authApi'

const initialState = {
  groups: [],
}

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload
    },
    addCalendarEvent: (state, action) => {
      const group = state.groups.find(group => action.payload.group_id === group.id)
      const widget = group.widgets.Calendar
      widget.push(action.payload)
    },
    addUserToGroup: (state, action) => {
      const group = state.groups.find(group => action.payload.group.id === group.id)
      group.users.push(action.payload.data)
    },
    joinedGroup: (state, action) => {
      state.groups.push(action.payload)
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
        state.groups.push(payload)
      }
    )
    builder.addMatcher(
      groupApi.endpoints.joinGroup.matchFulfilled,
      (state, { payload }) => {
        state.groups = state.groups.map(group => {
          if (group.id === payload.id) {
            return payload
          } else {
            return group
          }
        })
      }
    ) 
    builder.addMatcher(
      userApi.endpoints.signOutUser.matchFulfilled,
      (state, {payload}) => {
        return initialState
      }
    )
  }
})

export const { setGroups, addCalendarEvent, addUserToGroup, joinedGroup } = groupSlice.actions
export default groupSlice.reducer
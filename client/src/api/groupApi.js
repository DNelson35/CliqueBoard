import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => 'groups' 
    }),
    createGroups: builder.mutation({
        query: (groupInfo) => ({
            url: 'groups',
            method: 'POST',
            body: groupInfo,
        }),
    }),
    sendInvitation: builder.mutation({
      query: (invitationInfo) => ({
        url: 'invitations',
        method: 'POST',
        body: invitationInfo,
      }),
    }),
    deleteInvitation: builder.mutation({
      query: (invitation_id) => ({
        url: `invitations/${invitation_id}`,
        method: 'DELETE',
      })
    }),
    joinGroup: builder.mutation({
      query: (group_id) => ({
        url: 'join',
        method: 'POST',
        body: group_id,
      })
    }),
    createEvent: builder.mutation({
      query: (eventInfo) => ({
        url: 'widget_data',
        method: 'POST',
        body: eventInfo,
      }),
    }),
  }),
})

export const {useGetGroupsQuery, useCreateGroupsMutation, useSendInvitationMutation, useDeleteInvitationMutation, useJoinGroupMutation, useCreateEventMutation  } = groupApi
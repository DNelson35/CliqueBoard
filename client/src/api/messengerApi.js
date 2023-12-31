import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messengerApi = createApi({
    reducerPath: 'messengerApi',
    baseQuery: fetchBaseQuery({
    baseUrl: '/' }),
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: () => 'conversations'
        }),
        deleteMessage: builder.mutation({
            query: (message) => ({
                url: `messages/${message.id}`,
                method: 'DELETE'
            })
        }),
        updateMessage: builder.mutation({
            query: (message) => ({
                url: `messages/${message.id}`,
                method: 'PATCH',
                body: message
            })
        })
    }),
})

export const {useGetConversationsQuery, useDeleteMessageMutation, useUpdateMessageMutation} = messengerApi
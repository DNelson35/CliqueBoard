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
        })
    }),
})

export const {useGetConversationsQuery, useDeleteMessageMutation} = messengerApi
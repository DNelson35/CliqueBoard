import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messengerApi = createApi({
    reducerPath: 'messengerApi',
    baseQuery: fetchBaseQuery({
    baseUrl: '/' }),
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: () => 'conversations'
        })
    }),
})

export const {useGetConversationsQuery} = messengerApi
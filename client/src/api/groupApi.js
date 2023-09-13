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
   
  }),
})

export const {useGetGroupsQuery, useCreateGroupsMutation } = groupApi
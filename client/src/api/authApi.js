import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: () => 'me' 
    }),
    allUsers: builder.query({
      query: () => 'users'
    }),
    members: builder.query({
      query: () => 'members'
    }),
    loginUser: builder.mutation({
        query: (credentials) => ({
            url: 'login',
            method: 'POST',
            body: credentials,
        }),
    }),
    signUpUser: builder.mutation({
      query: (userInfo) => ({
        url: 'signup',
        method: 'POST',
        body: userInfo
      })
    }),
    signOutUser: builder.mutation({
        query: () => ({
            url: 'logout',
            method: 'DELETE',
        }),
    }),
    createMessage: builder.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message
      })
    }),
  }),
})

export const { useCheckUserQuery, useMembersQuery, useAllUsersQuery, useLoginUserMutation, useSignOutUserMutation, useSignUpUserMutation, useCreateMessageMutation} = userApi
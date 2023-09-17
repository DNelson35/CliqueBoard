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
  }),
})

export const { useCheckUserQuery, useAllUsersQuery, useLoginUserMutation, useSignOutUserMutation, useSignUpUserMutation} = userApi
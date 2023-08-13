import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const userApi = createApi({
    baseQuery: fetchBaseQuery({baseQuery: '/'}),
    endpoints: (builder) => ({
        checkUser: builder.query({
            query: 'me'
        })
    })
})

export const {useCheckUserQuery} = userApi
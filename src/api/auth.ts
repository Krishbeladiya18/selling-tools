import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const loginApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: commonBaseQuery('api'), 
  endpoints: (builder) => ({
    getLoginData: builder.query({
      query: () => `/login`, 
    }),

    postLoginData: builder.mutation({
      query: (body) => ({
        url: `/login`, 
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetLoginDataQuery, usePostLoginDataMutation } = loginApi

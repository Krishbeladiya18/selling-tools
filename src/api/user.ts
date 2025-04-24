import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: commonBaseQuery('api'), 
  endpoints: (builder) => ({
    getUserApi: builder.query({
      query: () => `/users`, 
    }),

    createUserApi: builder.mutation({
      query: (body) => ({
        url: `/create-user`, 
        method: 'POST',
        body,
      }),
    }),
    createPermissionApi: builder.mutation({
      query: (body) => ({
        url: `/permission/grant`, 
        method: 'POST',
        body,
      }),
    }),
    deleteUserApi: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`, 
        method: 'DELETE',
      }),
    }),

  }),
})

export const { useCreateUserApiMutation, useDeleteUserApiMutation, useCreatePermissionApiMutation , useGetUserApiQuery } = userApi

import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: commonBaseQuery('api'), 
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => `/category`, 
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: `/category`, 
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/category/${id}`, 
        method: 'PUT',
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`, 
        method: 'DELETE',
      }),
    }),

  }),
})

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation ,useGetCategoryQuery } = categoryApi

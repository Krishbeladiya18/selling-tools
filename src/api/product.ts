import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: commonBaseQuery('api'), 
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/products`, 
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: `/products`, 
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`, 
        method: 'PUT',
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`, 
        method: 'DELETE',
      }),
    }),

  }),
})

export const { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductQuery } = productApi

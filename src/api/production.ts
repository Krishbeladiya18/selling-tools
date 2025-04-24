import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const productionApi = createApi({
  reducerPath: 'productionApi',
  baseQuery: commonBaseQuery('api'), 
  endpoints: (builder) => ({
    getProduction: builder.query({
      query: () => `/productions`, 
    }),
    getProductionAll: builder.query({
        query: (status) => ({
            url: `/productions/?status=${status}`,
            method: 'GET',
        }),
    }),
    createProduction: builder.mutation({
      query: (body) => ({
        url: `/productions`, 
        method: 'POST',
        body,
      }),
    }),
    updateProduction: builder.mutation({
      query: ({ id, body }) => ({
        url: `/productions/${id}`, 
        method: 'PUT',
        body,
      }),
    }),
    deleteProduction: builder.mutation({
      query: (id) => ({
        url: `/productions/${id}`, 
        method: 'DELETE',
      }),
    }),
    getSingleProductions: builder.query({
        query: (id) => {
          return {
            url: `productions/${id}`,
          };
        },
      }),
  }),
})

export const { useCreateProductionMutation, useUpdateProductionMutation, useDeleteProductionMutation, useGetProductionQuery, useLazyGetSingleProductionsQuery, useGetProductionAllQuery } = productionApi


import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        getSale: builder.query({
            query: () => `/sales`,
        }),
        createSale: builder.mutation({
            query: (body) => ({
                url: `/sales`,
                method: 'POST',
                body,
            }),
        }),
        getSingleSale: builder.query({
            query: (id) => {
                return {
                    url: `/sales/${id}`,
                };
            },
        }),
    }),
})

export const { useCreateSaleMutation, useGetSaleQuery, useLazyGetSingleSaleQuery } = saleApi






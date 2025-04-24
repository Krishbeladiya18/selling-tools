import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `/transactions`,
        }),
        getOrderDetail: builder.query({
            query: ({type, id}) => ({
                url: `/transactions/${type}/${id}`,
                method: 'GET',
            }),
        }),

    }),
})

export const { useGetOrdersQuery, useGetOrderDetailQuery } = orderApi

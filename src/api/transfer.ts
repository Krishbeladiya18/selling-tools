
import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const transferApi = createApi({
    reducerPath: 'transferApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        getTransfer: builder.query({
            query: () => `/transfer`,
        }),
        createTransfer: builder.mutation({
            query: (body) => ({
                url: `/transfer`,
                method: 'POST',
                body,
            }),
        }),
        getSingleTransfer: builder.query({
            query: (id) => {
                return {
                    url: `transfer/${id}`,
                };
            },
        }),
    }),
})

export const { useCreateTransferMutation, useGetTransferQuery, useLazyGetSingleTransferQuery } = transferApi






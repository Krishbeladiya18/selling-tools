import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        getHomeCompanyApi: builder.query({
            query: () => `/home/companies`,
        }),
        getHomeProductApi: builder.query({
            query: () => `/home/products`,
        }),
       

    }),
})

export const { useGetHomeCompanyApiQuery, useGetHomeProductApiQuery } = homeApi

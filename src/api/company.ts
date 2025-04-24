import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const companyApi = createApi({
    reducerPath: 'companyApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: () => `/company`,
        }),
        

    }),
})

export const { useGetCompanyQuery } = companyApi


import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const screenApi = createApi({
    reducerPath: 'screenApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        getScreenApi: builder.query({
            query: ({userId, companyId}) => {
                return {
                    url: `/permission/user-permissions?userId=${userId}&companyId=${companyId}`
                }
            }
        }),
    }),
})

export const { useGetScreenApiQuery, useLazyGetScreenApiQuery  } = screenApi






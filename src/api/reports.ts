import { createApi } from '@reduxjs/toolkit/query/react'
import { commonBaseQuery } from './util'

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: commonBaseQuery('api'),
    endpoints: (builder) => ({
        ganrateStockReportsApi: builder.query({
            query: ({ startDate, endDate, type, companyIds, productIds }) => {
                let url = `/stock-report?startDate=${startDate}&endDate=${endDate}&type=${type}`;

                if (companyIds) {
                    url += `&companyIds=${companyIds}`;
                }

                if (productIds) {
                    url += `&productIds=${productIds}`;
                }
                return { url };
            },
        }),
        ganrateRegisterReportsApi: builder.query({
            query: ({ reportType, startDate, endDate, type, companyIds, productIds, status,transferType }) => {

                let url = `register-report/${reportType}?startDate=${startDate}&endDate=${endDate}&type=${type}`;

                if (companyIds) {
                    url += `&companyIds=${companyIds}`;
                }
        
                if (productIds) {
                    url += `&productIds=${productIds}`;
                }
        
                if (transferType && reportType === 'transfer') {
                    url += `&transferType=${transferType}`;
                }
        
                if (status?.length && reportType === 'production') {
                    url += `&status=${status.join(",")}`;
                }
                return { url };
            },
        }),
        
    }),
})

export const { useLazyGanrateStockReportsApiQuery, useLazyGanrateRegisterReportsApiQuery } = reportsApi;



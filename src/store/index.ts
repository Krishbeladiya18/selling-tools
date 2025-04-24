import { loginApi } from '@/api/auth'
import { categoryApi } from '@/api/category'
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modelSlices';
import refetchReducer from './slices/refetchSlice';
import { productApi } from '@/api/product';
import { orderApi } from '@/api/order';
import { transferApi } from '@/api/transfer';
import { saleApi } from '@/api/sale';
import { companyApi } from '@/api/company';
import { productionApi } from '@/api/production';
import { userApi } from '@/api/user';
import { screenApi } from '@/api/screen';
import { homeApi } from '@/api/home';
import { reportsApi } from '@/api/reports';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        refetch: refetchReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [transferApi.reducerPath]: transferApi.reducer,
        [saleApi.reducerPath]: saleApi.reducer,
        [productionApi.reducerPath]: productionApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [screenApi.reducerPath]: screenApi.reducer,
        [homeApi.reducerPath]: homeApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(loginApi.middleware)
      .concat(companyApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(transferApi.middleware)
      .concat(saleApi.middleware)
      .concat(productionApi.middleware)
      .concat(userApi.middleware)
      .concat(screenApi.middleware)
      .concat(homeApi.middleware)
      .concat(reportsApi.middleware)

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
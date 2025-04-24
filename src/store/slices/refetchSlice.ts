import { CONSTANTS } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export interface RefetchState {
  categories: boolean;
  products: boolean;
  users: boolean;
  orders: boolean;
  production: boolean;
  globalStocks: boolean;
}

const initialState: RefetchState = {
  categories: false,
  products: false,
  users: false,
  orders: false,
  production: false,
  globalStocks: false,
};

export const refetchSlice = createSlice({
  name: CONSTANTS.MODAL,
  initialState,
  reducers: {
    setRefetchCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setRefetchProducts: (state, { payload }) => {
      state.products = payload;
    },
    setRefetchUsers: (state, { payload }) => {
      state.users = payload;
    },
    setRefetchOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setRefetchProduction: (state, { payload }) => {
      state.production = payload;
    },
    setRefetchGlobalStocks: (state, { payload }) => {
      state.globalStocks = payload;
    },
  },
});

export const { setRefetchCategories, setRefetchProducts, setRefetchUsers, setRefetchOrders, setRefetchProduction, setRefetchGlobalStocks } =
  refetchSlice.actions;
export default refetchSlice.reducer;

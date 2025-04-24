import { Products } from "./products";

export interface AddedOrderProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface AddOrderProduct {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderCompany {
  id: number;
  name: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number
  quantity: number;
  total: number;
  product: Products;
}

interface CommonOrder {
  id: number;
  transactionId: string;
  fromCompany: OrderCompany;
  toCompany?: OrderCompany;
  toUser?: string;
  date: Date;
  totalProducts: number;
  total: number;
  createdAt: Date;
  isModifiable: boolean;
  isRemovable: boolean;
}

export interface Order extends CommonOrder {
  products: OrderProduct[];
}

export interface ExportOrder extends CommonOrder {
  products: Products[];
}

export interface StockOrderRow {
  fromCompany: string;
  toCompany?: string;
  toUser?: string;
  orderDate: string;
  productName: string;
  productStock: number;
  remainingStock: number;
}

export interface SaleOrderRow {
  fromCompany: string;
  toCompany?: string;
  toUser?: string;
  orderDate: string;
  productName: string;
  productPrice: number;
  productStock: number;
}

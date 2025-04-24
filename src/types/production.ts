import { Company, UserCompany } from "./company";
import { Products } from "./products";

export interface Production {
    id: number;
    quantity: number;
    total: number;
    status: "pending" | "completed";
    startDate: Date;
    date: Date;
    createdAt: Date;
    productId: number;
    companyId: number;
    company: Company;
    product: Products;
  }
  
  export interface AddedProductionProduct {
    id: number;
    name: string;
    quantity: number;
    price: number;
    totalAmount: number;
  }
  
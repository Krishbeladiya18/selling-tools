import { Category } from "./category";


export interface CommonStockReport {
    openingStock: number;
    productionStock: number;
    inward: number;
    outward: number;
    balanceStock: number;
}

export interface CompanyWiseGlobalStockReportRecord {
    companyId: number;
    companyName: string;
    products: GlobalStockReportProduct[];
    totalStock: number;
}

export interface GlobalStockReportProduct extends CommonGlobalStockReport {
    id: number;
    name: string;
    category: Category;
}
export interface CommonGlobalStockReport {
    stock: number;
}

export interface ProductWiseGlobalStockReportRecord {
    productId: number;
    productName: string;
    category: Category;
    companies: GlobalStockReportCompany[];
    totalStock: number;
}

export interface GlobalStockReportCompany extends CommonGlobalStockReport {
    id: number;
    name: string;
}

export interface CompanyWiseStockReportRecord {
    companyId: number;
    companyName: string;
    products: StockReportProduct[];
    total: CommonStockReport;
}

export interface StockReportProduct extends CommonStockReport {
    id: number;
    name: string;
}

export interface ProductWiseStockReportRecord {
    productId: number;
    productName: string;
    companies: StockReportCompany[];
    total: CommonStockReport;
}

export interface StockReportCompany extends CommonStockReport {
    id: number;
    name: string;
}
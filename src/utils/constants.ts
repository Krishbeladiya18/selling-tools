export const CONSTANTS = {
  PROJECT_NAME: "Selling App",

  AUTH_TOKEN: "token",

  LOGIN: "Login",
  REGISTER: "Register",

  LOGIN_FORM: "Login Form",
  REGISTER_FORM: "Register Form",
  CATEGORY_FORM: "Category Form",
  PRODUCT_FORM: "Product Form",
  USER_FORM: "User Form",
  ORDER_FORM: "Order Form",
  ORDER_PRODUCT_FORM: "Order Product Form",

  HOME: "Home",
  CATEGORY: "Category",
  PRODUCT: "Product",
  CATEGORIES: "Categories",
  PRODUCTS: "Products",
  SALE: "Sales",
  PERMISSION: "Permission",
  PERMISSION_MANAGEMENT: "Permission Management",
  TRANSFER: "Transfer",
  TRANSFER_PRODUCTS: "Transfer Products",
  SALE_PRODUCTS: "Sale Products",

  MODAL: "modal",
  CANCEL: "Cancel",
  SAVE: "Save",
  EDIT: "Edit",
  DELETE: "Delete",
  REMOVE: "Remove",
  DETAILS: "Details",
  FILTER: "Filter",
  APPLY: "Apply",

  SUB_TOTAL: "Subtotal",
  TAX: "Tax",
  TOTAL: "Total",
  ADD: "Add",
  UPDATE: "Update",
  RESET: "Reset",
  PREVIEW: "Preview",
  EXPORT_AS_PDF: "Export as PDF",
  REGENERATE: "Regenerate",
  COMPLETE: "Complete",
  OPTIONAL: "Optional",
  GRAND_TOTAL: 'Grand Total',

  // Order Details
  TRANSFER_FROM: "Transfer From",
  SALE_FROM: "Sale From",
  TRANSFER_TO: "Transfer To",
  SALE_TO: "Sale To",
  TOTAL_PRODUCTS: "Total Products",
  TOTAL_AMOUNT: "Total Amount",

  // Production
  PRODUCTION: "Production",

  // Reports
  REPORTS: "Reports",
  REPORT: "Report",
  STOCK_REPORT: "Stock Report",
  REGISTER_REPORT: "Register Report",
  PRODUCTION_REPORT: "Production Report",
  SALE_REPORT: "Sale Report",
  TRANSFER_REPORT: "Transfer Report",
  STOCK_REPORT_FILE_NAME: "stock-report",
  SALE_REPORT_FILE_NAME: "sale-report",

  DEFAULT_ICON_COLOR: "#656576",

  COMPANY_WISE: "Company Wise",
  PRODUCT_WISE: "Product Wise",
  CATEGORY_WISE: "Category Wise",

  COMPANY_WISE_VALUE: "company",
  PRODUCT_WISE_VALUE: "product",

  COMMON_DATE_FORMAT: "DD/MM/YY",
  COMMON_DAY_FORMAT: "yyyy-MM-dd",
};

export const VALUES = {
  HEADER_HEIGHT: 64,
  NAVBAR_HEIGHT: 72,

  COMMON_SEARCH_DELAY: 800,
  SCROLL_THROTTLE_INTERVAL: 400,

  COMMON_DATA_LIMIT: 20,
  CATEGORIES_LIMIT: 30,
  PRODUCTS_LIMIT: 20,
  ORDERS_LIMIT: 20,
  PRODUCTION_LIMIT: 20,
  USERS_LIMIT: 20,
  TAX: 0,

  NAME_CELL_SIZE: 150,
  AVAILABLE_PAST_ORDER_DATE: 3 * 24 * 60 * 60 * 1000,
};

export const TRUTHY_VALUES = ["true", "TRUE", "t", "T"];

export const PERMISSIONS = {
  HOME: "dashboard",
  PRODUCT: "product",
  ORDER: "order",
  PRODUCTION: "production",
  REPORT: "report",
  USER: "user",
};

export const ORDER_TYPES = {
  TRANSFER: CONSTANTS.TRANSFER.toLowerCase(),
  SALE: CONSTANTS.SALE.toLowerCase(),
};

export const REPORT_TYPES = {
  STOCK: CONSTANTS.STOCK_REPORT,
  REGISTER: CONSTANTS.REGISTER_REPORT,
};

export const REPORT_ENTITY_TYPES = {
  COMPANY: CONSTANTS.COMPANY_WISE_VALUE,
  PRODUCT: CONSTANTS.PRODUCT_WISE_VALUE,
};


export const REGISTER_REPORT_TYPES = {
  PRODUCTION: CONSTANTS.PRODUCTION,
  SALE: CONSTANTS.SALE,
  TRANSFER: CONSTANTS.TRANSFER,
};

export const COLORS = {
  APP_PRIMARY: "#02007c",
  APP_PRIMARY_LIGHT: "#ebedf7",
  APP_PRIMARY_HOVER: "#010054",
  APP_BACKGROUND: "#ffffff",
  APP_FOREGROUND: "#0a0a0a",
  APP_INPUT: "#e5e5e5",
  APP_TEXT_FOREGROUND: "#7e7e97",
  APP_GRAY: "#f3f4f6",
};

export const PRODUCTION_STATUS_TYPES = {
  PENDING: "PENDING".toLowerCase(),
  COMPLETED: "COMPLETED".toLowerCase(),
};

export const TRANSFER_REPORT_TYPES = {
  INWARD: "inward",
  OUTWARD: "outward",
};

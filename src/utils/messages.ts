const MSG = {
  ERROR_MSG: {
    LOGIN_ERROR: "Failed to Login",
    REGISTER_ERROR: "Failed to Register",

    SOMETHING_WENT_WRONG: "Something Went Wrong!",
    SELECT_CATEGORY: "Please select a category",
    SELECT_PRODUCT: "Please select a product",
    ADD_PRODUCT: "Please add a product",
    FROM_TO_COMPANIES_NOT_SAME: "From and To companies must not be the same.",

    SELECT_FROM_COMPANY: "Please select a From company",
    SELECT_TO_COMPANY: "Please select a To company",
    SELECT_COMPANY: "Please select a company",
    SELECT_TO_USER: "Please select a user to sale.",
    ADD_TRANSFER_PRODUCTS: "Please select products to transfer.",
    ADD_SALE_PRODUCTS: "Please select products to sale.",
    NOT_ENOUGH_STOCK: "Not have enough stock for the product.",
    SELECT_DATE_RANGE: "Please select a date range.",
    SELECT_APPROX_DATE: "Please Select Apx. Complete Date",
    START_DATE_VALIDATION: "The start date must be within the last 3 days, including today.",
    APPROX_DATE_NOT_LESS: "Apx. Complete Date shouldn't be less than the Start Date.",
    COMPLETE_DATE_NOT_LESS: "Complete Date shouldn't be less than the Start Date.",
  },

  SUCCESS_MSG: {
    LOGIN_SUCCESS: "User logged-in successfully",
    REGISTER_SUCCESS: "User registered successfully",

    // Category
    CATEGORY_CREATE: "Category created successfully",
    CATEGORY_UPDATE: "Category updated successfully",
    CATEGORY_DELETED: "Category deleted successfully",

    // Product
    PRODUCT_CREATE: "Product created successfully",
    PRODUCT_UPDATE: "Product updated successfully",
    PRODUCT_DELETED: "Product deleted successfully",

    // User
    USER_CREATE: "User created successfully",
    USER_UPDATE: "User updated successfully",
    USER_DELETED: "User deleted successfully",

    // Permission
    PERMISSON_UPDATE: "Permission updated successfully",

    // Order
    TRANSFER_CREATE: "Transfer created successfully",
    SALE_CREATE: "Sale created successfully",
    TRANSFER_ORDER_UPDATE: "Transfer Order updated successfully",
    SALE_ORDER_UPDATE: "Sale Order updated successfully",
    TRANSFER_ORDER_DELETED: "Transfer Order deleted successfully",
    SALE_ORDER_DELETED: "Sale Order deleted successfully",

    // Production
    PRODUCTION_CREATE: "Production created successfully",
    PRODUCTION_UPDATE: "Production updated successfully",
    PRODUCTION_DELETED: "Production deleted successfully",
    PRODUCTION_EXPORTED: "Production report exported successfully",

    // Report
    REPORT_EXPORTED: "Report exported successfully",
  },

  WARNING_MSG: {
    DELETE_CATEGORY: "Are you sure want to delete this category?",
    DELETE_PRODUCT: "Are you sure want to delete this product?",
    DELETE_PRODUCTION: "Are you sure want to delete this production?",
    DELETE_ORDER_PRODUCT: "Are you sure want to remove this product?",
    DELETE_TRANSFER_ORDER: "Are you sure want to remove this transfer order",
    DELETE_SALE_ORDER: "Are you sure want to remove this sale order",
  },

  INFO_MSG: {
    WELCOME_LOGIN: "Welcome Back! Please Enter Your Details",
    WELCOME_REGISTER: "Please Enter Your Details",
    FORGOT_PASSWORD: "Forgot Password?",
    DONT_HAVE_ACCOUNT: `Don't have an account?`,
    ALREADY_HAVE_ACCOUNT: `Already have an account?`,
    NO_DATA_FOUND: "No Data Found!",
    NO_CATEGORY_FOUND: "No Category Found!",
    NO_PRODUCT_FOUND: "No Product Found!",
    NO_ORDER_FOUND: "No Order Found!",
    NO_USER_FOUND: "No User Found!",
    NO_COMPANY_FOUND: "No Company Found!",
    NO_PRODUCTION_FOUND: "No Production Found!",
    NO_STOCK_FOUND: "No Stock Found!",

    ADD_CATEGORY: "Add Category",
    EDIT_CATEGORY: "Edit Category",
    DELETE_CATEGORY: "Delete Category",

    ADD_PRODUCT: "Add Product",
    EDIT_PRODUCT: "Edit Product",
    DELETE_PRODUCT: "Delete Product",
    DELETE_PRODUCTION: "Delete Production",
    DELETE_TRANSFER_ORDER: "Delete Transfer Order",
    DELETE_SALE_ORDER: "Delete Sale Order",
    DELETE_ORDER_PRODUCT: "Remove Product",

    GIVE_PERMISSION: "Give Permission",
    MODIFY_PERMISSION: "Modify Permission",
    FILTER_PRODUCTION: "Filter Production",
    FILTER_STOCKS: "Filter Stocks",
    FILTER_ORDERS: "Filter Orders",

    ADD_USER: "Add User",
    EDIT_USER: "Edit User",
    DELETE_USER: "Delete User",

    STOCK_REPORT: "Stock Report (Preview)",
    PRODUCTION_REPORT: "Production Report (Preview)",
    SALE_REPORT: "Sale Report (Preview)",
    TRANSFER_REPORT: "Transfer Report (Preview)",
    CREATE_PRODUCTION: "Create Production",
    EDIT_PRODUCTION: "Edit Production",
    COMPLETE_PRODUCTION: "Complete Production",
  },
};

export const { ERROR_MSG, SUCCESS_MSG, WARNING_MSG, INFO_MSG } = MSG;

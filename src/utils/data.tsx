import { NavbarSection } from "@/types/common";
import { CONSTANTS, PRODUCTION_STATUS_TYPES, REGISTER_REPORT_TYPES, REPORT_ENTITY_TYPES, REPORT_TYPES, TRANSFER_REPORT_TYPES } from "./constants";
import { HomeIcon } from "@/components/icons/home-icon";
import { ReportIcon } from "@/components/icons/report-icon";
import { BasketIcon } from "@/components/icons/basket-icon";
import { SaleIcon } from "@/components/icons/sale-icon";
import { ProductIcon } from "@/components/icons/product-icon";
import EditIcon from "@/assets/svg/edit.svg";
import DeleteIcon from "@/assets/svg/delete.svg";
import { LABELS } from "./form";

export interface ActionType {
    value: string;
    label: string;
    icon?: any;
}

export const NAVBAR_SECTIONS: NavbarSection[] = [
    {
        path: "/",
        label: CONSTANTS.HOME,
        icon: HomeIcon
    },
    {
        path: "/products",
        label: CONSTANTS.PRODUCT,
        icon: ProductIcon
    },
    {
        path: "/orders",
        label: CONSTANTS.SALE,
        icon: SaleIcon,
    },
    {
        path: "/production",
        label: CONSTANTS.PRODUCTION,
        icon: BasketIcon,
    },
    {
        path: "/reports",
        label: CONSTANTS.REPORT,
        icon: ReportIcon,
    },
];

export const PRODUCT_PAGE_OPTIONS = [
    { value: CONSTANTS.CATEGORY, label: CONSTANTS.CATEGORY, },
    { value: CONSTANTS.PRODUCT, label: CONSTANTS.PRODUCT, },
];


export const SALE_OPTIONS = [
    { path: "/orders/transfer", label: CONSTANTS.TRANSFER },
    { path: "/orders/sale", label: CONSTANTS.SALE },
];

export const PRODUCTION_STATUS = [
    { value: PRODUCTION_STATUS_TYPES.PENDING, label: LABELS.PENDING },
    { value: PRODUCTION_STATUS_TYPES.COMPLETED, label: LABELS.COMPLETED },
];


export const REPORT_ENTITY_OPTIONS = [
    { value: REPORT_ENTITY_TYPES.COMPANY, label: CONSTANTS.COMPANY_WISE, shortLabel: LABELS.COMPANY },
    { value: REPORT_ENTITY_TYPES.PRODUCT, label: CONSTANTS.PRODUCT_WISE, shortLabel: LABELS.PRODUCT },
];


export const EDIT_ACTION: ActionType = { value: CONSTANTS.EDIT, label: CONSTANTS.EDIT, icon: <img src={EditIcon} alt="" /> };
export const DELETE_ACTION: ActionType = { value: CONSTANTS.DELETE, label: CONSTANTS.DELETE, icon: <img src={DeleteIcon} alt="" /> };

export const COMMON_MODIFY_ACTIONS: ActionType[] = [EDIT_ACTION, DELETE_ACTION];

export const SCREEN_LIST = [
    { lable: 'Dashboard', checked: false },
    { lable: 'Category', checked: false },
    { lable: 'Products', checked: false },
    { lable: 'Sell', checked: false },
    { lable: 'Report', checked: false },
];

export const REPORT_OPTIONS = [
    { value: REPORT_TYPES.STOCK, label: REPORT_TYPES.STOCK },
    { value: REPORT_TYPES.REGISTER, label: REPORT_TYPES.REGISTER },
]

export const REGISTER_REPORT_OPTIONS = [
    { value: REGISTER_REPORT_TYPES.PRODUCTION.toLowerCase(), label: LABELS.PRODUCTION_REPORT },
    { value: REGISTER_REPORT_TYPES.SALE.toLowerCase(), label: LABELS.SALE_REGISTER },
    { value: REGISTER_REPORT_TYPES.TRANSFER.toLowerCase(), label: LABELS.TRANSFER_REGISTER },
];


export const TRANSFER_REPORT_OPTIONS = [
    { value: TRANSFER_REPORT_TYPES.INWARD, label: LABELS.INWARD },
    { value: TRANSFER_REPORT_TYPES.OUTWARD, label: LABELS.OUTWARD },
];
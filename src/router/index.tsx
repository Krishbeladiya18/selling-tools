
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import OrderDetails from "@/pages/order-details";
import Orders from "@/pages/Orders";
import Product from "@/pages/Product";
import ModifyDrawer from "@/pages/modify-drawer";
import ProductionList from "@/pages/Production";
import ModifyProduction from "@/pages/modify-production";
import Permissions from "@/pages/Permissions";
import Reports from "@/pages/Reports";
import StockReports from "@/components/reports/stock-report";

interface PublicRouteType {
    path: string;
    component: React.ReactNode; 
}

export const AuthRoutes: PublicRouteType[] = [
    { path: "/login", component: <Login /> }
];

export const ProtectedRoutes: PublicRouteType[] = [
    { path: "/", component: <Home /> },
    { path: "/products", component: <Product /> },
    { path: "/orders", component: <Orders /> },
    { path: "/orders/:type", component: <ModifyDrawer /> },
    { path: "/ordersdetails/:type/:id", component: <OrderDetails /> },
    { path: "/production", component: <ProductionList /> },
    { path: "/production/create", component: <ModifyProduction /> },
    { path: "/production/:id", component: <ModifyProduction /> },
    { path: "/permissions", component: <Permissions /> },
    { path: "/reports", component: <Reports /> },
    { path: "/stockreports", component: <StockReports /> },
    { path: "/registerreports", component: <StockReports /> },
]
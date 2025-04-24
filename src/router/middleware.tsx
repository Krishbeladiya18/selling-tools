import { Navigate } from "react-router-dom";

interface AuthMiddlewareProps {
    children: React.ReactNode;
}

export const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
    const token = localStorage.getItem('token');

    if (token) return <Navigate to="/" />;

    return children;
};


export const ProtectedMiddleware = ({ children }: AuthMiddlewareProps) => {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" />;

    return children;
};

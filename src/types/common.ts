export interface NavbarSection {
    path: string;
    label: string;
    icon: any;
}

export interface IconProps {
    color?: string;
}

export interface SelectResourceDataRecord {
    id: number;
    label: string;
}

export interface SelectOptionRecord {
    value: string;
    label: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    [key: string]: any;
}

export interface LogoutResponse {
    message?: string;
    error?: string;
    [key: string]: any;
}

export interface ApiResponse<T> {
    result: T;
    error?: string;
    data?: any;
}


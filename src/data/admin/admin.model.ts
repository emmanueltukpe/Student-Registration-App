export interface IAdmin {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role?: "admin" | "super_admin";
}

export interface AdminDTO extends IAdmin {
    admin_secret: string;
}

export interface AdminUpdateDTO {
    name: string;
}

export interface AdminLoginDTO {
    email: string;
    password: string;
}
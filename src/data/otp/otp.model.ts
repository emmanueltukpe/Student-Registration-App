export interface IOtp {
    _id?: string;
    email: string;
    password?: string;
    code?: string;
    is_verified?: boolean;
}

export interface IResetPassword {
    code: string;
    password: string;
}

export type CreateOtpDTO = IOtp;

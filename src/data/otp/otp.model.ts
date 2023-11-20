export interface IOtp {
    _id: string;
    email: string;
    password: string;
    code: string;
    is_verified?: boolean;
}

export type CreateOtpDTO = IOtp;

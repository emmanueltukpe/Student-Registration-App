import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import env from "../common/config/env";

class JWTHandler {
    private readonly secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    generateToken(payload: any, options?: SignOptions): string {
        return jwt.sign(payload, this.secretKey, options);
    }

    verifyToken(token: string, options?: VerifyOptions): any {
        return jwt.verify(token, this.secretKey, options);
    }
}

export const jwtHandler = new JWTHandler(env.jwt_secret);

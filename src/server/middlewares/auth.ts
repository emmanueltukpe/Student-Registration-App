import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import env from "../../common/config/env";
import { UNAUTHORIZED } from "http-status-codes";

export const SECRET_KEY: Secret = env.jwt_secret;

export interface CustomRequest extends Request {
    token: string | JwtPayload | void;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(UNAUTHORIZED).json({
                error: "Ivalid token entered",
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(UNAUTHORIZED).json({
            error: "You are unauthenticated, you cannot perform this action",
            code: err
        });
    }
};

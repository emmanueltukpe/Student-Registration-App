import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../common/errors";
import { FORBIDDEN } from "http-status-codes";

type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

export const isAdmin: MiddlewareFunction = (req, res, next) => {
    const user = req.user;
    if (user.role && (user.role === "admin" || user.role === "super_admin")) {
        next();
    } else {
        const Forbid = new ForbiddenError();
        res.status(FORBIDDEN).json({
            message: Forbid.message,
            code: Forbid.code,
            error_code: Forbid.error_code
        });
    }
};

export const isSuperAdmin: MiddlewareFunction = (req, res, next) => {
    const user = req.user;
    if (user.role && user.role === "super_admin") {
        next();
    } else {
        const Forbid = new ForbiddenError();
        res.status(FORBIDDEN).json({
            message: Forbid.message,
            code: Forbid.code,
            error_code: Forbid.error_code
        });
    }
};

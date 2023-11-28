import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../common/errors";

type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

export const isAdmin: MiddlewareFunction = (req, res, next) => {
    const user = req.user;
    if (user && (user.role === "admin" || user.role === "super_admin")) {
        next();
    } else {
        throw new ForbiddenError();
    }
};

export const isSuperAdmin: MiddlewareFunction = (req, res, next) => {
    const user = req.user;
    if (user && user.role === "super_admin") {
        next();
    } else {
        throw new ForbiddenError();
    }
};

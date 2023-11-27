import { Request, Response, NextFunction } from "express";
import logger from "../../common/logger";

/**
 * Express Middleware that logs incoming HTTP requests.
 */
export default (req: Request, res: Response, next: NextFunction) => {
    logger.logAPIRequest(req);
    next();
};

import { logger } from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message || "Internal server error",
        stack: err.stack,
        route: req.originalUrl,
        method: req.method
    });

    res.status(err.status || 500).json({
        error: err.message || "Internal server error"
    });
}
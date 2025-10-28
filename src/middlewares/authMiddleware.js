import { logger } from "../config/logger.js";
import { VerifyToken } from "../utils/authToken.js";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader) return res.json({message: "No token provided"});

        const token = authHeader?.split(" ")[1];
        if(!token) return res.json({message: "No token provided"});

        const decode = VerifyToken(token);
        const user = await User.findByPk(decode.id);
        if(!user) return res.status(401).json({message: "Invalid token"})
        req.user = user;

        next();

    } catch (error) {
        logger.error("Error trying to verify token");
        res.status(500).json({error: "Internal server error while verifying token"});
    }
}

export const authorize = (role=[]) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user.role;

            if (!role.includes(userRole)){
                return res.status(403).json({message: `Access denied: ${userRole} role not authorized`});
            }

            next();
        } catch (error) {
            res.status(403).json({error: "Forbidden: Admin privileges only"});
        }
    }
}
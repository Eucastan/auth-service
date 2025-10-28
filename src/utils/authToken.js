import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const SignToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: "24h"
    });
    
}

export const VerifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token");
    }
}
import dotenv from "dotenv";
dotenv.config();

const RATE_LIMIT = Number(process.env.RATE_LIMIT || 10);
const WINDOWS_MS = Number(process.env.WINDOWS_MS || 60000);

const requestStore = new Map();

export const rateLimiter = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress || "unknown";
    const clientRequests = requestStore.get(clientIp) || [];

    // Filter requests within the time window
    const now = Date.now();
    const windowRequests = clientRequests.filter(timestamp => now - timestamp < WINDOWS_MS);

    // If over limit, reject
    if (windowRequests.length >= RATE_LIMIT){
        return res.status(429).json({error: "Too many requests. Try again later."});
    }

    // Add current request timestamp
    windowRequests.push(now);
    requestStore.set(clientIp, windowRequests);

    next();
}
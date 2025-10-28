import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());

// Global rate limiter (skip health checks)
app.use((req, res, next) => {
  const skipPaths = ["/health", "/readiness"];
  if (skipPaths.includes(req.path)) return next();
  rateLimiter(req, res, next);
});

// Routes
app.use("/api/auth", router);

// Health route
app.get("/health", (req, res) => {
    res.json({
        ok: true,
        message: "auth-service",
        uptime: process.uptime(),
        timestamps: new Date()
    });
});

// Readiness probe
app.get("/readiness", (req, res) => {
    res.json({
        ok: true,
        message: "auth-service",
        uptime: process.uptime(),
        timestamps: new Date()
    });
});

app.use(errorHandler);

export default app;
import express from "express";
import { Register, Login, removeUser, Profile } from "../controller/authController.js";
import { authMiddleware, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.delete("/removeuser/:id", authMiddleware, authorize(["admin"]), removeUser);
router.get("/profile", authMiddleware, Profile)

export default router;
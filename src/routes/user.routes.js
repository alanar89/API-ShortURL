import express from "express";
import { profile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";
const router = express.Router();

router.get("/profile", verifyToken, profile);

export default router;

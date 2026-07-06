import { Router } from "express";

const router = Router();

import {
  register,
  login,
  getProfile,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

// Auth endpoints
router.post("/register", register);
router.post("/login", login);

// Protected endpoint
router.get("/profile", authenticate, getProfile);

// Password recovery endpoints
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password", resetPasswordHandler);

// Test endpoint
router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

export default router;
import { loginUser } from "../services/auth.service.js";
import { registerUser } from "../services/auth.service.js";
import { forgotPassword, resetPassword } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser(username, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        channelName: user.channelName,
        role: user.role,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(message === "Email already exists" ? 400 : 500).json({
      success: false,
      message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(
      email,
      password
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        channelName: user.channelName,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Internal Server Error";

    res.status(401).json({
      success: false,
      message,
    });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// Handle forgot password request
export const forgotPasswordHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken: result.resetToken,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(404).json({
      success: false,
      message,
    });
  }
};

// Handle reset password request
export const resetPasswordHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Reset token and new password are required",
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
      return;
    }

    await resetPassword(resetToken, newPassword);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    const statusCode = message.includes("expired") ? 400 : 400;

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
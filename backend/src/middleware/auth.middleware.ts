import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

interface JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access Denied",
        data: null,
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.DTUBE_CONSTELLATION_Conspiracy_SECRET;

    if (!token || !secret) {
      res.status(401).json({
        success: false,
        message: "Access Denied",
        data: null,
      });
      return;
    }

    const decoded = jwt.verify(token, secret) as unknown as JwtPayload;
    const user = await User.findById(decoded.id).select("isBanned role");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
        data: null,
      });
      return;
    }

    if (user.isBanned) {
      res.status(403).json({
        success: false,
        message: "User is banned",
        data: null,
      });
      return;
    }

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
      data: null,
    });
  }
};
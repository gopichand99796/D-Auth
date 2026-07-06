import type { Request, Response, NextFunction } from "express";

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const key = req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";
  const now = Date.now();
  const entry = requestCounts.get(key);

  if (!entry || entry.resetAt <= now) {
    requestCounts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (entry.count >= MAX_REQUESTS) {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
      data: null,
    });
    return;
  }

  entry.count += 1;
  requestCounts.set(key, entry);
  next();
};

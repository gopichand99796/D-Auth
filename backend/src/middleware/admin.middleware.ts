import type { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Admin access required",
      data: null,
    });
    return;
  }

  next();
};

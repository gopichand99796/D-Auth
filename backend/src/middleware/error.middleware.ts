import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  const status =
    err instanceof Error && (err as any).status
      ? (err as any).status
      : err instanceof Error && err.message.includes("Unauthorized")
      ? 403
      : err instanceof Error && err.message.includes("Invalid")
      ? 401
      : 500;

  const message = err instanceof Error ? err.message : "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    data: null,
  });
};

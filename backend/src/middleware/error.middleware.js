export const notFoundHandler = (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        data: null,
    });
};
export const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    const status = err instanceof Error && err.status
        ? err.status
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
//# sourceMappingURL=error.middleware.js.map
export const isAdmin = (req, res, next) => {
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
//# sourceMappingURL=admin.middleware.js.map
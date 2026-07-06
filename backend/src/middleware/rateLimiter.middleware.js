const requestCounts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;
export const rateLimiter = (req, res, next) => {
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
//# sourceMappingURL=rateLimiter.middleware.js.map
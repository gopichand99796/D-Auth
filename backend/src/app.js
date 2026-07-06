import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comments.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { rateLimiter } from "./middleware/rateLimiter.middleware.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(express.json());
// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to DTube API",
        data: null,
    });
});
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
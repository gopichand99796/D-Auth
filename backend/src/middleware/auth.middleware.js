import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authenticate = async (req, res, next) => {
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
        const decoded = jwt.verify(token, secret);
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
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Invalid Token",
            data: null,
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import crypto from "crypto";
export async function registerUser(username, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        channelName: username,
    });
    return user;
}
export async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    if (user.isBanned) {
        throw new Error("User is banned");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid Credentials");
    }
    const token = generateToken(user._id.toString(), user.role);
    return { user, token };
}
// Generate a reset token and store it with expiry (valid for 1 hour)
export async function forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Store the hashed token and expiry time in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    await user.save();
    return {
        message: "Reset token generated",
        resetToken, // In a real app, send this via email
    };
}
// Validate the reset token and update password
export async function resetPassword(resetToken, newPassword) {
    const user = await User.findOne({
        resetPasswordToken: resetToken,
    });
    if (!user) {
        throw new Error("Invalid reset token");
    }
    // Check if token is expired
    if (!user.resetPasswordTokenExpiry ||
        new Date() > user.resetPasswordTokenExpiry) {
        throw new Error("Reset token expired");
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiry = null;
    await user.save();
    return {
        message: "Password reset successfully",
    };
}
//# sourceMappingURL=auth.service.js.map
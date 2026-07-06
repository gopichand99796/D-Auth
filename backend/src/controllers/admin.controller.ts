import type { Request, Response } from "express";
import * as adminService from "../services/admin.service.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, message: "Users retrieved", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Unable to get users", data: null });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await adminService.getAllVideos();
    res.status(200).json({ success: true, message: "Videos retrieved", data: videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Unable to get videos", data: null });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await adminService.getAllComments();
    res.status(200).json({ success: true, message: "Comments retrieved", data: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Unable to get comments", data: null });
  }
};

export const banUser = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.id);
    const user = await adminService.banUser(userId);
    res.status(200).json({ success: true, message: "User banned successfully", data: user });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to ban user";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const unbanUser = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.id);
    const user = await adminService.unbanUser(userId);
    res.status(200).json({ success: true, message: "User unbanned successfully", data: user });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to unban user";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const blockVideo = async (req: Request, res: Response) => {
  try {
    const videoId = String(req.params.id);
    const video = await adminService.blockVideo(videoId);
    res.status(200).json({ success: true, message: "Video blocked successfully", data: video });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to block video";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const unblockVideo = async (req: Request, res: Response) => {
  try {
    const videoId = String(req.params.id);
    const video = await adminService.unblockVideo(videoId);
    res.status(200).json({ success: true, message: "Video unblocked successfully", data: video });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to unblock video";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const hideComment = async (req: Request, res: Response) => {
  try {
    const commentId = String(req.params.id);
    const comment = await adminService.hideComment(commentId);
    res.status(200).json({ success: true, message: "Comment hidden successfully", data: comment });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to hide comment";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const unhideComment = async (req: Request, res: Response) => {
  try {
    const commentId = String(req.params.id);
    const comment = await adminService.unhideComment(commentId);
    res.status(200).json({ success: true, message: "Comment unhidden successfully", data: comment });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to unhide comment";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const videoId = String(req.params.id);
    const video = await adminService.deleteVideoAsAdmin(videoId);
    res.status(200).json({ success: true, message: "Video deleted successfully", data: video });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to delete video";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = String(req.params.id);
    const comment = await adminService.deleteCommentAsAdmin(commentId);
    res.status(200).json({ success: true, message: "Comment deleted successfully", data: comment });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unable to delete comment";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message, data: null });
  }
};

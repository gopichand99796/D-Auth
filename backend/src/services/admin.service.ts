import User from "../models/User.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

export async function getAllUsers() {
  return await User.find().select("username email role isBanned channelName avatar subscribers createdAt");
}

export async function getAllVideos() {
  return await Video.find().populate("owner", "username channelName avatar").sort({ createdAt: -1 });
}

export async function getAllComments() {
  return await Comment.find()
    .populate("user", "username avatar")
    .populate("video", "title")
    .sort({ createdAt: -1 });
}

export async function banUser(id: string) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  user.isBanned = true;
  await user.save();
  return user;
}

export async function unbanUser(id: string) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  user.isBanned = false;
  await user.save();
  return user;
}

export async function blockVideo(id: string) {
  const video = await Video.findById(id);
  if (!video) {
    throw new Error("Video not found");
  }

  video.isBlocked = true;
  await video.save();
  return video;
}

export async function unblockVideo(id: string) {
  const video = await Video.findById(id);
  if (!video) {
    throw new Error("Video not found");
  }

  video.isBlocked = false;
  await video.save();
  return video;
}

export async function hideComment(id: string) {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  comment.isHidden = true;
  await comment.save();
  return comment;
}

export async function unhideComment(id: string) {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  comment.isHidden = false;
  await comment.save();
  return comment;
}

export async function deleteVideoAsAdmin(id: string) {
  const video = await Video.findById(id);
  if (!video) {
    throw new Error("Video not found");
  }

  await video.deleteOne();
  return video;
}

export async function deleteCommentAsAdmin(id: string) {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  await comment.deleteOne();
  return comment;
}

import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
export async function createComment(data) {
    const video = await Video.findById(data.video);
    if (!video) {
        throw new Error("Video not found");
    }
    const comment = await Comment.create(data);
    return await comment.populate("user", "username avatar");
}
export async function getCommentsByVideo(videoId) {
    return await Comment.find({ video: videoId, isHidden: false })
        .populate("user", "username avatar")
        .sort({ createdAt: -1 });
}
export async function updateComment(id, userId, content) {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.user.toString() !== userId) {
        throw new Error("Unauthorized: Can only edit own comment");
    }
    comment.content = content;
    await comment.save();
    return await comment.populate("user", "username avatar");
}
export async function deleteComment(id, userId) {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.user.toString() !== userId) {
        throw new Error("Unauthorized: Can only delete own comment");
    }
    await Comment.findByIdAndDelete(id);
    return comment;
}
//# sourceMappingURL=comment.service.js.map
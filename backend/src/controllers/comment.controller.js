import * as commentService from "../services/comment.service.js";
export const create = async (req, res) => {
    try {
        const { videoId, content } = req.body;
        if (!videoId || !content) {
            res.status(400).json({
                success: false,
                message: "videoId and content are required",
            });
            return;
        }
        const comment = await commentService.createComment({
            video: videoId,
            user: String(req.user.id),
            content,
        });
        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: comment,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Failed to create comment",
        });
    }
};
export const getCommentsByVideo = async (req, res) => {
    try {
        const videoId = String(req.params.videoId);
        if (!videoId) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
            });
            return;
        }
        const comments = await commentService.getCommentsByVideo(videoId);
        res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            data: comments,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve comments",
        });
    }
};
export const update = async (req, res) => {
    try {
        const id = String(req.params.id);
        const { content } = req.body;
        if (!id || !content) {
            res.status(400).json({
                success: false,
                message: "Comment ID and content are required",
            });
            return;
        }
        const comment = await commentService.updateComment(id, String(req.user.id), content);
        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            data: comment,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Failed to update comment",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Comment ID is required",
            });
            return;
        }
        const comment = await commentService.deleteComment(id, String(req.user.id));
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            data: comment,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Failed to delete comment",
        });
    }
};
//# sourceMappingURL=comment.controller.js.map
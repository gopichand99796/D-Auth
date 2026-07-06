import fs from "fs";
import path from "path";
import * as videoService from "../services/video.service.js";
const VIDEO_DIRECTORY = path.resolve("uploads", "videos");
function getContentType(filename) {
    const extension = path.extname(filename).toLowerCase();
    switch (extension) {
        case ".mp4":
            return "video/mp4";
        case ".webm":
            return "video/webm";
        case ".ogg":
            return "video/ogg";
        default:
            return "application/octet-stream";
    }
}
// Create a new video
export const create = async (req, res) => {
    try {
        const { title, description, category, duration } = req.body;
        // Validate required fields
        if (!title) {
            res.status(400).json({
                success: false,
                message: "Title is required",
                data: null,
            });
            return;
        }
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Video file is required",
                data: null,
            });
            return;
        }
        const video = await videoService.createVideo({
            title,
            description: description || "",
            category: category || "General",
            duration: duration || 0,
            videoUrl: req.file.filename, // Store only filename
            owner: String(req.user.id), // Owner from authenticated user
        });
        res.status(201).json({
            success: true,
            message: "Video created successfully",
            data: video,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Video creation failed",
            data: null,
        });
    }
};
// Get all videos
export const getAll = async (_req, res) => {
    try {
        const videos = await videoService.getAllVideos();
        res.status(200).json({
            success: true,
            message: "Videos retrieved successfully",
            data: videos,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve videos",
            data: null,
        });
    }
};
// Get single video by ID
export const getOne = async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        const video = await videoService.getVideoById(id);
        if (!video) {
            res.status(404).json({
                success: false,
                message: "Video not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Video retrieved successfully",
            data: video,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve video",
            data: null,
        });
    }
};
export const trending = async (_req, res) => {
    try {
        const videos = await videoService.getTrendingVideos();
        res.status(200).json({
            success: true,
            message: "Trending videos retrieved successfully",
            data: videos,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve trending videos",
            data: null,
        });
    }
};
export const like = async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        const result = await videoService.likeVideo(id, String(req.user.id));
        res.status(200).json({
            success: true,
            message: "Video liked successfully",
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to like video";
        const status = message.includes("Already liked") ? 400 : message.includes("not found") ? 404 : 500;
        res.status(status).json({
            success: false,
            message,
            data: null,
        });
    }
};
export const unlike = async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        const result = await videoService.unlikeVideo(id, String(req.user.id));
        res.status(200).json({
            success: true,
            message: "Video unliked successfully",
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to unlike video";
        const status = message.includes("not found") ? 404 : 500;
        res.status(status).json({
            success: false,
            message,
            data: null,
        });
    }
};
export const getLikes = async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        const result = await videoService.getVideoLikes(id);
        res.status(200).json({
            success: true,
            message: "Likes count retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve likes",
            data: null,
        });
    }
};
// Stream video content with HTTP Range support
export const stream = async (req, res) => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        const video = await videoService.getVideoById(id);
        if (!video || video.isBlocked) {
            res.status(404).json({
                success: false,
                message: "Video not found",
                data: null,
            });
            return;
        }
        const filePath = path.join(VIDEO_DIRECTORY, video.videoUrl);
        // Check file existence and metadata without loading the file into memory
        let fileStat;
        try {
            fileStat = await fs.promises.stat(filePath);
        }
        catch {
            res.status(404).json({
                success: false,
                message: "Video file not found",
                data: null,
            });
            return;
        }
        const fileSize = fileStat.size;
        const range = req.headers.range;
        const contentType = getContentType(video.videoUrl);
        if (range) {
            // Parse the requested byte range
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parts[0] ? parseInt(parts[0], 10) : 0;
            const requestedEnd = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const end = isNaN(requestedEnd) ? fileSize - 1 : Math.min(requestedEnd, fileSize - 1);
            if (isNaN(start) || start < 0 || start > end || start >= fileSize) {
                res.status(416).json({
                    success: false,
                    message: "Requested Range Not Satisfiable",
                    data: null,
                });
                return;
            }
            const chunkSize = end - start + 1;
            // Set headers needed for HTTP range responses
            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": contentType,
            });
            // Increment views when streaming begins successfully
            await videoService.incrementVideoViews(id);
            const streamFile = fs.createReadStream(filePath, { start, end });
            streamFile.pipe(res);
        }
        else {
            // No range header: stream the full video
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": contentType,
                "Accept-Ranges": "bytes",
            });
            await videoService.incrementVideoViews(id);
            const streamFile = fs.createReadStream(filePath);
            streamFile.pipe(res);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Video streaming failed",
            data: null,
        });
    }
};
// Update video
export const update = async (req, res) => {
    try {
        const id = String(req.params.id);
        const userId = String(req.user.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        // Handle thumbnail upload if present
        if (req.file) {
            req.body.thumbnailUrl = req.file.filename;
        }
        const video = await videoService.updateVideo(id, userId, req.body);
        res.status(200).json({
            success: true,
            message: "Video updated successfully",
            data: video,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update video";
        const statusCode = message.includes("Unauthorized") ? 403 : message.includes("not found") ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message,
            data: null,
        });
    }
};
// Delete video
export const remove = async (req, res) => {
    try {
        const id = String(req.params.id);
        const userId = String(req.user.id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Video ID is required",
                data: null,
            });
            return;
        }
        await videoService.deleteVideo(id, userId);
        res.status(200).json({
            success: true,
            message: "Video deleted successfully",
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete video";
        const statusCode = message.includes("Unauthorized") ? 403 : message.includes("not found") ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message,
            data: null,
        });
    }
};
//# sourceMappingURL=video.controller.js.map
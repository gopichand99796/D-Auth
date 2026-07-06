import Video from "../models/Video.js";
import Like from "../models/Like.js";
export async function createVideo(data) {
    // Ensure owner comes from authenticated user, never from request body
    const video = await Video.create(data);
    return await video.populate("owner", "username channelName avatar");
}
export async function getAllVideos() {
    return await Video.find({ isBlocked: false })
        .populate("owner", "username channelName avatar")
        .sort({ createdAt: -1 });
}
export async function getTrendingVideos() {
    return await Video.find({ isBlocked: false })
        .populate("owner", "username channelName avatar")
        .sort({ views: -1, likes: -1, createdAt: -1 })
        .limit(20);
}
export async function getVideoById(id) {
    return await Video.findById(id).populate("owner", "username channelName avatar");
}
export async function getVideoLikes(id) {
    const likeCount = await Like.countDocuments({ video: id });
    return { likes: likeCount };
}
export async function likeVideo(id, userId) {
    const video = await Video.findById(id);
    if (!video) {
        throw new Error("Video not found");
    }
    const existingLike = await Like.findOne({ video: id, user: userId });
    if (existingLike) {
        throw new Error("Already liked this video");
    }
    await Like.create({ video: id, user: userId });
    video.likes += 1;
    await video.save();
    return { likes: video.likes };
}
export async function unlikeVideo(id, userId) {
    const like = await Like.findOne({ video: id, user: userId });
    if (!like) {
        throw new Error("Like not found");
    }
    await like.deleteOne();
    const video = await Video.findById(id);
    if (!video) {
        throw new Error("Video not found");
    }
    video.likes = Math.max(0, video.likes - 1);
    await video.save();
    return { likes: video.likes };
}
export async function incrementVideoViews(id) {
    return await Video.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
}
export async function updateVideo(id, userId, data) {
    // Remove sensitive fields from update
    delete data.owner;
    delete data._id;
    const video = await Video.findById(id);
    if (!video) {
        throw new Error("Video not found");
    }
    // Check if user is the owner
    if (video.owner.toString() !== userId) {
        throw new Error("Unauthorized: Can only update own videos");
    }
    // Update only allowed fields
    const allowedUpdates = ["title", "description", "category", "thumbnailUrl"];
    allowedUpdates.forEach((field) => {
        if (data[field] !== undefined) {
            video[field] = data[field];
        }
    });
    await video.save();
    return await video.populate("owner", "username channelName avatar");
}
export async function deleteVideo(id, userId) {
    const video = await Video.findById(id);
    if (!video) {
        throw new Error("Video not found");
    }
    // Check if user is the owner
    if (video.owner.toString() !== userId) {
        throw new Error("Unauthorized: Can only delete own videos");
    }
    await Video.findByIdAndDelete(id);
    return video;
}
//# sourceMappingURL=video.service.js.map
import { Router } from "express";
import * as video from "../controllers/video.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { videoUpload, thumbnailUpload } from "../config/multer.js";

const router = Router();

// Create a new video (requires authentication and video file)
router.post(
  "/",
  authenticate,
  videoUpload.single("video"),
  video.create
);

// Trending videos
router.get("/trending", video.trending);

// Get all videos (no authentication required)
router.get("/", video.getAll);

// Stream video content using HTTP Range requests
router.get("/stream/:id", video.stream);

// Like endpoints
router.post("/:id/like", authenticate, video.like);
router.delete("/:id/like", authenticate, video.unlike);
router.get("/:id/likes", video.getLikes);

// Get single video by ID (no authentication required)
router.get("/:id", video.getOne);

// Update video (requires authentication, optional thumbnail)
router.put(
  "/:id",
  authenticate,
  thumbnailUpload.single("thumbnail"),
  video.update
);

// Delete video (requires authentication)
router.delete("/:id", authenticate, video.remove);

export default router;
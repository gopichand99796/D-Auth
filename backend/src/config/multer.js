import multer from "multer";
import path from "path";
// Configure storage for video files
const videoStorage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "uploads/videos");
    },
    filename(_req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
// Configure storage for thumbnail files
const thumbnailStorage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "uploads/thumbnails");
    },
    filename(_req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
// Multer for video uploads
const videoUpload = multer({
    storage: videoStorage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
});
// Multer for thumbnail uploads
const thumbnailUpload = multer({
    storage: thumbnailStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
export { videoUpload, thumbnailUpload };
export default videoUpload;
//# sourceMappingURL=multer.js.map
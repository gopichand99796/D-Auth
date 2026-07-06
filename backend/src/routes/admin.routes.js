import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
const router = Router();
router.use(authenticate, isAdmin);
router.get("/users", adminController.getUsers);
router.get("/videos", adminController.getVideos);
router.get("/comments", adminController.getComments);
router.patch("/users/:id/ban", adminController.banUser);
router.patch("/users/:id/unban", adminController.unbanUser);
router.patch("/videos/:id/block", adminController.blockVideo);
router.patch("/videos/:id/unblock", adminController.unblockVideo);
router.patch("/comments/:id/hide", adminController.hideComment);
router.patch("/comments/:id/unhide", adminController.unhideComment);
router.delete("/videos/:id", adminController.deleteVideo);
router.delete("/comments/:id", adminController.deleteComment);
export default router;
//# sourceMappingURL=admin.routes.js.map
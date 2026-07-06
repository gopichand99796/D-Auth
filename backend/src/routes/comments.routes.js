import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/", authenticate, commentController.create);
router.get("/video/:videoId", commentController.getCommentsByVideo);
router.put("/:id", authenticate, commentController.update);
router.delete("/:id", authenticate, commentController.remove);
export default router;
//# sourceMappingURL=comments.routes.js.map
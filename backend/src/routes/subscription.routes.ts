import { Router } from "express";
import * as subscriptionController from "../controllers/subscription.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/channels/:channelId/subscribe",
  authenticate,
  subscriptionController.subscribe
);

router.delete(
  "/channels/:channelId/subscribe",
  authenticate,
  subscriptionController.unsubscribe
);

router.get(
  "/channels/:channelId/subscribers",
  subscriptionController.getChannelSubscribers
);

router.get(
  "/users/me/subscriptions",
  authenticate,
  subscriptionController.getUserSubscriptions
);

export default router;

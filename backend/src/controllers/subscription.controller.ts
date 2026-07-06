import type { Request, Response } from "express";
import * as subscriptionService from "../services/subscription.service.js";

export const subscribe = async (req: Request, res: Response) => {
  try {
    const channelId = String(req.params.channelId);

    if (!channelId) {
      res.status(400).json({
        success: false,
        message: "Channel ID is required",
      });
      return;
    }

    const result = await subscriptionService.subscribeChannel(
      String(req.user!.id),
      channelId
    );

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Subscription failed",
    });
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const channelId = String(req.params.channelId);

    if (!channelId) {
      res.status(400).json({
        success: false,
        message: "Channel ID is required",
      });
      return;
    }

    const result = await subscriptionService.unsubscribeChannel(
      String(req.user!.id),
      channelId
    );

    res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Unsubscribe failed",
    });
  }
};

export const getChannelSubscribers = async (req: Request, res: Response) => {
  try {
    const channelId = String(req.params.channelId);

    if (!channelId) {
      res.status(400).json({
        success: false,
        message: "Channel ID is required",
      });
      return;
    }

    const result = await subscriptionService.getChannelSubscribers(channelId);

    res.status(200).json({
      success: true,
      message: "Subscriber count retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Failed to retrieve subscribers",
    });
  }
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const result = await subscriptionService.getUserSubscriptions(
      String(req.user!.id)
    );

    res.status(200).json({
      success: true,
      message: "Subscriptions retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Failed to retrieve subscriptions",
    });
  }
};

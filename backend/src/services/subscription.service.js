import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
export async function subscribeChannel(subscriberId, channelId) {
    const channel = await User.findById(channelId);
    if (!channel) {
        throw new Error("Channel not found");
    }
    if (subscriberId === channelId) {
        throw new Error("Cannot subscribe to yourself");
    }
    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId,
    });
    if (existingSubscription) {
        throw new Error("Already subscribed to this channel");
    }
    await Subscription.create({
        subscriber: subscriberId,
        channel: channelId,
    });
    channel.subscribers += 1;
    await channel.save();
    const subscriberCount = await Subscription.countDocuments({ channel: channelId });
    return { subscriberCount };
}
export async function unsubscribeChannel(subscriberId, channelId) {
    const subscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId,
    });
    if (!subscription) {
        throw new Error("Subscription not found");
    }
    await subscription.deleteOne();
    const channel = await User.findById(channelId);
    if (channel && channel.subscribers > 0) {
        channel.subscribers -= 1;
        await channel.save();
    }
    const subscriberCount = await Subscription.countDocuments({ channel: channelId });
    return { subscriberCount };
}
export async function getChannelSubscribers(channelId) {
    const channelExists = await User.exists({ _id: channelId });
    if (!channelExists) {
        throw new Error("Channel not found");
    }
    const subscriberCount = await Subscription.countDocuments({ channel: channelId });
    return { subscriberCount };
}
export async function getUserSubscriptions(userId) {
    const subscriptions = await Subscription.find({ subscriber: userId }).populate("channel", "username avatar channelName");
    return subscriptions.map((subscription) => subscription.channel);
}
//# sourceMappingURL=subscription.service.js.map
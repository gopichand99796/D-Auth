export declare function subscribeChannel(subscriberId: string, channelId: string): Promise<{
    subscriberCount: number;
}>;
export declare function unsubscribeChannel(subscriberId: string, channelId: string): Promise<{
    subscriberCount: number;
}>;
export declare function getChannelSubscribers(channelId: string): Promise<{
    subscriberCount: number;
}>;
export declare function getUserSubscriptions(userId: string): Promise<import("mongoose").Types.ObjectId[]>;
//# sourceMappingURL=subscription.service.d.ts.map
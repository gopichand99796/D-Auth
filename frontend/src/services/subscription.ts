import api from './api';

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscribers: number;
  };
}

export async function subscribeToChannel(channelId: string): Promise<number> {
  try {
    const response = await api.post(`/api/subscriptions/channels/${channelId}/subscribe`);
    if (response.data.success) {
      return response.data.data.subscribers;
    }
    throw new Error('Failed to subscribe');
  } catch (error) {
    console.error('Error subscribing:', error);
    throw error;
  }
}

export async function unsubscribeFromChannel(channelId: string): Promise<number> {
  try {
    const response = await api.delete(`/api/subscriptions/channels/${channelId}/subscribe`);
    if (response.data.success) {
      return response.data.data.subscribers;
    }
    throw new Error('Failed to unsubscribe');
  } catch (error) {
    console.error('Error unsubscribing:', error);
    throw error;
  }
}

export async function getChannelSubscribers(channelId: string): Promise<number> {
  try {
    const response = await api.get(`/api/subscriptions/channels/${channelId}/subscribers`);
    if (response.data.success) {
      return response.data.data.subscribers;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
}

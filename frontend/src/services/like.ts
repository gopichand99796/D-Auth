import api from './api';

export interface LikeResponse {
  success: boolean;
  message: string;
  data: {
    likes: number;
  };
}

export async function likeVideo(videoId: string): Promise<number> {
  try {
    const response = await api.post(`/api/videos/${videoId}/like`);
    if (response.data.success) {
      return response.data.data.likes;
    }
    throw new Error('Failed to like video');
  } catch (error) {
    console.error('Error liking video:', error);
    throw error;
  }
}

export async function unlikeVideo(videoId: string): Promise<number> {
  try {
    const response = await api.delete(`/api/videos/${videoId}/like`);
    if (response.data.success) {
      return response.data.data.likes;
    }
    throw new Error('Failed to unlike video');
  } catch (error) {
    console.error('Error unliking video:', error);
    throw error;
  }
}

export async function getVideoLikes(videoId: string): Promise<number> {
  try {
    const response = await api.get(`/api/videos/${videoId}/likes`);
    if (response.data.success) {
      return response.data.data.likes;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
}

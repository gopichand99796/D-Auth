import api from './api';

export interface AdminStats {
  users: number;
  videos: number;
  comments: number;
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  isBanned: boolean;
}

export interface AdminVideo {
  _id: string;
  title: string;
  owner: string;
  ownerName: string;
  isBlocked: boolean;
}

export interface AdminComment {
  _id: string;
  text: string;
  user: {
    _id: string;
    username: string;
  };
  isHidden: boolean;
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const response = await api.get('/api/admin/stats');
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Failed to fetch stats');
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<AdminUser[]> {
  try {
    const response = await api.get('/api/admin/users');
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getAllVideos(): Promise<AdminVideo[]> {
  try {
    const response = await api.get('/api/admin/videos');
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function getAllComments(): Promise<AdminComment[]> {
  try {
    const response = await api.get('/api/admin/comments');
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function banUser(userId: string): Promise<void> {
  try {
    const response = await api.post(`/api/admin/users/${userId}/ban`);
    if (!response.data.success) {
      throw new Error('Failed to ban user');
    }
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
}

export async function unbanUser(userId: string): Promise<void> {
  try {
    const response = await api.post(`/api/admin/users/${userId}/unban`);
    if (!response.data.success) {
      throw new Error('Failed to unban user');
    }
  } catch (error) {
    console.error('Error unbanning user:', error);
    throw error;
  }
}

export async function blockVideo(videoId: string): Promise<void> {
  try {
    const response = await api.post(`/api/admin/videos/${videoId}/block`);
    if (!response.data.success) {
      throw new Error('Failed to block video');
    }
  } catch (error) {
    console.error('Error blocking video:', error);
    throw error;
  }
}

export async function unblockVideo(videoId: string): Promise<void> {
  try {
    const response = await api.post(`/api/admin/videos/${videoId}/unblock`);
    if (!response.data.success) {
      throw new Error('Failed to unblock video');
    }
  } catch (error) {
    console.error('Error unblocking video:', error);
    throw error;
  }
}

export async function deleteVideo(videoId: string): Promise<void> {
  try {
    const response = await api.delete(`/api/admin/videos/${videoId}`);
    if (!response.data.success) {
      throw new Error('Failed to delete video');
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}

export async function hideComment(commentId: string): Promise<void> {
  try {
    const response = await api.post(`/api/admin/comments/${commentId}/hide`);
    if (!response.data.success) {
      throw new Error('Failed to hide comment');
    }
  } catch (error) {
    console.error('Error hiding comment:', error);
    throw error;
  }
}

export async function unhideComment(commentId: string): Promise<void> {
  try {
    const response = await api.post(`/api/admin/comments/${commentId}/unhide`);
    if (!response.data.success) {
      throw new Error('Failed to unhide comment');
    }
  } catch (error) {
    console.error('Error unhiding comment:', error);
    throw error;
  }
}

export async function deleteComment(commentId: string): Promise<void> {
  try {
    const response = await api.delete(`/api/admin/comments/${commentId}`);
    if (!response.data.success) {
      throw new Error('Failed to delete comment');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

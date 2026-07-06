import api from './api';

export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  video: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface CommentsListResponse {
  success: boolean;
  message: string;
  data: Comment[];
}

export async function getCommentsByVideo(videoId: string): Promise<Comment[]> {
  try {
    const response = await api.get(`/api/comments/video/${videoId}`);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function addComment(videoId: string, text: string): Promise<Comment> {
  try {
    const response = await api.post(`/api/comments`, {
      video: videoId,
      text,
    });
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Failed to add comment');
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function editComment(commentId: string, text: string): Promise<Comment> {
  try {
    const response = await api.put(`/api/comments/${commentId}`, { text });
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Failed to edit comment');
  } catch (error) {
    console.error('Error editing comment:', error);
    throw error;
  }
}

export async function deleteComment(commentId: string): Promise<void> {
  try {
    const response = await api.delete(`/api/comments/${commentId}`);
    if (!response.data.success) {
      throw new Error('Failed to delete comment');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

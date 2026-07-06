import api from './api';
import type { Video } from '../types';

export async function uploadVideo(formData: FormData): Promise<Video> {
  const response = await api.post('/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const raw = response.data?.data;
  return {
    id: raw._id,
    owner: raw.owner?._id || raw.owner || '',
    title: raw.title,
    description: raw.description || '',
    category: raw.category || 'General',
    views: typeof raw.views === 'number' ? raw.views : 0,
    thumbnailUrl: raw.thumbnailUrl || '',
    videoUrl: raw.videoUrl || '',
    ownerName: raw.owner?.channelName || raw.owner?.username || 'Unknown',
    createdAt: raw.createdAt || '',
  };
}

export async function getTrendingVideos(): Promise<Video[]> {
  const response = await api.get('/videos/trending');
  const list = response.data?.data || [];
  return Array.isArray(list)
    ? list.map((raw: any) => ({
        id: raw._id,
        owner: raw.owner?._id || raw.owner || '',
        title: raw.title,
        description: raw.description || '',
        category: raw.category || 'General',
        views: typeof raw.views === 'number' ? raw.views : 0,
        thumbnailUrl: raw.thumbnailUrl || '',
        videoUrl: raw.videoUrl || '',
        ownerName: raw.owner?.channelName || raw.owner?.username || 'Unknown',
        createdAt: raw.createdAt || '',
      }))
    : [];
}

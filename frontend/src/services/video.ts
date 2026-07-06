import api from './api';
import type { Video } from '../types';

function mapVideo(raw: any): Video {
  return {
    id: raw._id,
    owner: raw.owner?._id || raw.owner || '',
    title: raw.title,
    description: raw.description || '',
    category: raw.category || 'General',
    views: typeof raw.views === 'number' ? raw.views : Number(raw.views) || 0,
    thumbnailUrl: raw.thumbnailUrl || '',
    videoUrl: raw.videoUrl || '',
    ownerName: raw.owner?.channelName || raw.owner?.username || 'Unknown',
    createdAt: raw.createdAt || '',
  };
}

export async function getVideoList(): Promise<Video[]> {
  const response = await api.get('/videos');
  const list = response.data?.data || [];
  return Array.isArray(list) ? list.map(mapVideo) : [];
}

export async function getVideoById(id: string): Promise<Video> {
  const response = await api.get(`/videos/${id}`);
  return mapVideo(response.data?.data);
}

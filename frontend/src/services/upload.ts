import api from './api';
import type { Video } from '../types';

type RawVideo = {
  _id?: string;
  owner?: Record<string, unknown> | string;
  title?: string;
  description?: string;
  category?: string;
  views?: number;
  thumbnailUrl?: string;
  videoUrl?: string;
  createdAt?: string;
};

function mapRawVideo(raw: RawVideo): Video {
  const owner = raw.owner;
  const ownerName =
    typeof owner === 'object' && owner !== null
      ? (owner as Record<string, unknown>)?.channelName || (owner as Record<string, unknown>)?.username || 'Unknown'
      : 'Unknown';

  return {
    id: raw._id || '',
    owner: typeof owner === 'object' && owner !== null ? String((owner as Record<string, unknown>)?._id || '') : String(owner || ''),
    title: raw.title || 'Untitled',
    description: raw.description || '',
    category: raw.category || 'General',
    views: typeof raw.views === 'number' ? raw.views : 0,
    thumbnailUrl: raw.thumbnailUrl || '',
    videoUrl: raw.videoUrl || '',
    ownerName,
    createdAt: raw.createdAt || '',
  };
}

export async function uploadVideo(formData: FormData): Promise<Video> {
  const response = await api.post('/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const raw = response.data?.data as RawVideo;
  return mapRawVideo(raw);
}

export async function getTrendingVideos(): Promise<Video[]> {
  const response = await api.get('/videos/trending');
  const list = response.data?.data || [];
  return Array.isArray(list) ? (list as RawVideo[]).map(mapRawVideo) : [];
}

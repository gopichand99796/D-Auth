import api from './api';
import type { Video } from '../types';

type RawVideo = {
  _id?: string;
  owner?: Record<string, unknown> | string;
  title?: string;
  description?: string;
  category?: string;
  views?: number | string;
  thumbnailUrl?: string;
  videoUrl?: string;
  createdAt?: string;
};

function mapVideo(raw: RawVideo): Video {
  const owner = raw.owner;
  const ownerData = typeof owner === 'object' && owner !== null ? owner as Record<string, unknown> : {};
  const ownerName =
    typeof owner === 'object' && owner !== null
      ? String(ownerData.channelName || ownerData.username || 'Unknown')
      : 'Unknown';

  return {
    id: raw._id || '',
    owner:
      typeof owner === 'object' && owner !== null
        ? String(ownerData._id || ownerData.id || '')
        : String(owner || ''),
    title: raw.title || 'Untitled',
    description: raw.description || '',
    category: raw.category || 'General',
    views: typeof raw.views === 'number' ? raw.views : Number(raw.views) || 0,
    thumbnailUrl: raw.thumbnailUrl || '',
    videoUrl: raw.videoUrl || '',
    ownerName,
    createdAt: raw.createdAt || '',
  };
}

export async function getVideoList(): Promise<Video[]> {
  const response = await api.get('/videos');
  const list = response.data?.data || [];
  return Array.isArray(list) ? (list as RawVideo[]).map(mapVideo) : [];
}

export async function getVideoById(id: string): Promise<Video> {
  const response = await api.get(`/videos/${id}`);
  return mapVideo(response.data?.data as RawVideo);
}

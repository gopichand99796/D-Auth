import type { Video } from '../types';
import LikeButton from './LikeButton';
import SubscribeButton from './SubscribeButton';

interface VideoPlayerProps {
  video: Video;
}

const BACKEND_BASE = import.meta.env.VITE_API_URL
  ? String(import.meta.env.VITE_API_URL).replace(/\/api$/, '')
  : 'http://localhost:5001';

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const source = `${BACKEND_BASE}/api/videos/stream/${video.id}`;
  const poster = video.thumbnailUrl
    ? video.thumbnailUrl.startsWith('http')
      ? video.thumbnailUrl
      : `${BACKEND_BASE}/uploads/thumbnails/${video.thumbnailUrl}`
    : undefined;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-black p-2 shadow-sm">
        <video
          controls
          src={source}
          poster={poster}
          className="h-[360px] w-full rounded-2xl bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>{video.category}</span>
          <span>•</span>
          <span>{video.views} views</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">{video.title}</h1>
        <p className="text-sm text-slate-600">Channel: {video.ownerName}</p>
        <div className="flex gap-4 pt-2">
          <LikeButton videoId={video.id} />
          <SubscribeButton channelId={video.owner} channelName={video.ownerName} />
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-700">{video.description}</p>
      </div>
    </div>
  );
}

import type { Video } from '../types';

const BACKEND_BASE = import.meta.env.VITE_API_URL
  ? String(import.meta.env.VITE_API_URL).replace(/\/api$/, '')
  : 'http://localhost:5001';

export default function VideoCard({ video }: { video: Video }) {
  const thumbSrc = video.thumbnailUrl
    ? video.thumbnailUrl.startsWith('http')
      ? video.thumbnailUrl
      : `${BACKEND_BASE}/uploads/thumbnails/${video.thumbnailUrl}`
    : undefined;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative overflow-hidden bg-slate-200">
        {thumbSrc ? (
          <img src={thumbSrc} alt={video.title} className="h-[180px] w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-[180px] items-center justify-center text-sm text-slate-500">
            No thumbnail
          </div>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-1">{video.category}</span>
        </div>
        <h3 className="text-base font-semibold text-slate-900 truncate">{video.title}</h3>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>{video.ownerName}</span>
          <span>{video.views} views</span>
        </div>
      </div>
    </article>
  );
}

import type { Video } from '../types';
import { getDuration, formatViewCount, formatDate } from '../data/placeholders';

const BACKEND_BASE = import.meta.env.VITE_API_URL
  ? String(import.meta.env.VITE_API_URL).replace(/\/api$/, '')
  : 'http://localhost:5001';

export default function VideoCard({ video, showDuration = true }: { video: Video; showDuration?: boolean }) {
  const thumbSrc = video.thumbnailUrl
    ? video.thumbnailUrl.startsWith('http')
      ? video.thumbnailUrl
      : `${BACKEND_BASE}/uploads/thumbnails/${video.thumbnailUrl}`
    : undefined;
  const duration = showDuration ? getDuration() : undefined;
  const formattedViews = formatViewCount(video.views);
  const formattedDate = formatDate(video.createdAt);

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative overflow-hidden bg-gray-200 aspect-video">
        {thumbSrc ? (
          <img src={thumbSrc} alt={video.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No thumbnail
          </div>
        )}
        {duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-1 text-xs font-medium text-white">
            {duration}
          </span>
        )}
      </div>
      <div className="flex gap-3 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          {video.ownerName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{video.title}</h3>
          <div className="mt-1 text-xs text-gray-600">
            <span className="font-medium text-gray-900">{video.ownerName}</span>
            <span className="mx-1">•</span>
            <span>{formattedViews} views</span>
            <span className="mx-1">•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

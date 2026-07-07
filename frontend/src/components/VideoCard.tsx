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
  const avatarLetter = video.ownerName?.charAt(0).toUpperCase() || 'U';

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-gray-200 aspect-video">
        {thumbSrc ? (
          <img src={thumbSrc} alt={video.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">No thumbnail</div>
        )}
        {duration && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
            {duration}
          </span>
        )}
      </div>
      <div className="flex gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          {avatarLetter}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-5">{video.title}</h3>
          <p className="mt-2 text-xs text-gray-600">{video.ownerName}</p>
          <p className="mt-1 text-xs text-gray-500">
            {formattedViews} views · {formattedDate}
          </p>
        </div>
      </div>
    </article>
  );
}

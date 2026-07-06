import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import type { Video } from '../types';

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <Link key={video.id} to={`/watch/${video.id}`} className="block text-inherit">
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
}

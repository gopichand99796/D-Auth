import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import type { Video } from '../types';

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <Link key={video.id} to={`/watch/${video.id}`} className="block text-inherit">
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
}

import { useEffect, useState } from 'react';
import VideoGrid from '../components/VideoGrid';
import SkeletonCard from '../components/SkeletonCard';
import { getTrendingVideos } from '../services/upload';
import { PLACEHOLDER_VIDEOS } from '../data/placeholders';
import type { Video } from '../types';

export default function TrendingPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTrending() {
      try {
        const list = await getTrendingVideos();
        setVideos(list);
      } catch (err) {
        setError('Failed to load trending videos.');
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  const displayVideos = videos.length > 0 ? videos : PLACEHOLDER_VIDEOS;

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Trending</h1>
            <p className="mt-2 text-sm text-gray-600">Most viewed videos right now.</p>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-2 text-sm text-gray-700">
            {videos.length} trending videos
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
            {error}
          </div>
        ) : videos.length === 0 ? (
          <VideoGrid videos={displayVideos} />
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </section>
  );
}

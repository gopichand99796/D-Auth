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
      } catch (_err) {
        setError('Failed to load trending videos.');
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  const isEmpty = !loading && !error && videos.length === 0;
  const displayVideos = videos.length > 0 ? videos : PLACEHOLDER_VIDEOS;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Trending</h1>
            <p className="mt-2 text-sm text-gray-600">Popular videos from the community.</p>
          </div>
          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            {loading ? 'Loading trending' : `${videos.length} trending videos`}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
            {error}
          </div>
        ) : (
          <>
            {isEmpty && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">No trending videos yet</h3>
                <p className="mt-2 text-sm text-gray-600">Try refreshing once content becomes available.</p>
              </div>
            )}
            <VideoGrid videos={displayVideos} />
          </>
        )}
      </div>
    </section>
  );
}

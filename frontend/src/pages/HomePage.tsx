import { useEffect, useState } from 'react';
import VideoGrid from '../components/VideoGrid';
import SkeletonCard from '../components/SkeletonCard';
import { getVideoList } from '../services/video';
import { PLACEHOLDER_VIDEOS } from '../data/placeholders';
import type { Video } from '../types';

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchVideos() {
      try {
        const list = await getVideoList();
        setVideos(list);
      } catch (_err) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const isEmpty = !loading && !error && videos.length === 0;
  const displayVideos = videos.length > 0 ? videos : PLACEHOLDER_VIDEOS;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Welcome to DTube</h1>
            <p className="mt-2 text-sm text-gray-600">A clean and simple student-built video platform.</p>
          </div>
          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            {loading ? 'Loading videos...' : `${videos.length} videos available`}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Recommended</h2>
            <p className="text-sm text-gray-600">
              {isEmpty ? 'No uploaded videos yet. Sample videos are shown below.' : 'Browse the latest content.'}
            </p>
          </div>
        </div>

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
                <h3 className="text-lg font-semibold text-gray-900">No videos uploaded yet</h3>
                <p className="mt-2 text-sm text-gray-600">These sample videos appear while the library is empty.</p>
              </div>
            )}
            <VideoGrid videos={displayVideos} />
          </>
        )}
      </div>
    </section>
  );
}

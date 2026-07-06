import { useEffect, useState } from 'react';
import VideoGrid from '../components/VideoGrid';
import { getTrendingVideos } from '../services/upload';
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

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Trending</h1>
            <p className="mt-2 text-sm text-slate-600">Most viewed videos right now.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
            Fresh trending picks for you
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
            Loading...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
            {error}
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
            No trending videos.
          </div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </section>
  );
}

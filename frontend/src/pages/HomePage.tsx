import { useEffect, useState } from 'react';
import VideoGrid from '../components/VideoGrid';
import { getVideoList } from '../services/video';
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
      } catch (err) {
        setError('Failed to load videos.');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Welcome to DTube</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Watch, like, and share videos from your college community.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {videos.length} videos ready to watch
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recommended</h2>
            <p className="text-sm text-slate-600">A clean list of videos from the backend.</p>
          </div>
        </div>

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
            No videos available.
          </div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </section>
  );
}

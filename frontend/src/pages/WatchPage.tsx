import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoById, getVideoList } from '../services/video';
import type { Video } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import CommentList from '../components/CommentList';
import ChatWindow from '../components/ChatWindow';

export default function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendations, setRecommendations] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Failed to load video.');
      setLoading(false);
      return;
    }

    const videoId = id;

    async function fetchVideo() {
      try {
        const [found, list] = await Promise.all([getVideoById(videoId), getVideoList()]);
        setVideo(found);
        setRecommendations(list.filter((item) => item.id !== videoId).slice(0, 4));
      } catch (err) {
        setError('Failed to load video.');
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [id]);

  return (
    <section className="space-y-6">
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
          {error}
        </div>
      ) : video ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(360px,1.1fr)]">
          <div className="space-y-6">
            <VideoPlayer video={video} />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <CommentList videoId={video.id} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Live Chat</h2>
              <div className="mt-4">
                <ChatWindow videoId={video.id} />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Recommended</h2>
                  <p className="text-sm text-slate-500">Other videos you may like.</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {recommendations.length === 0 ? (
                  <p className="text-sm text-slate-600">No recommendations available.</p>
                ) : (
                  recommendations.map((item) => (
                    <Link key={item.id} to={`/watch/${item.id}`} className="block rounded-3xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-white">
                      <div className="text-sm font-semibold text-slate-900 truncate">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.ownerName} • {item.views} views</div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
          Video not found.
        </div>
      )}
    </section>
  );
}

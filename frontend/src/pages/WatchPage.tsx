import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoById, getVideoList } from '../services/video';
import { PLACEHOLDER_VIDEOS } from '../data/placeholders';
import type { Video } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import CommentList from '../components/CommentList';
import ChatWindow from '../components/ChatWindow';
import VideoCard from '../components/VideoCard';

export default function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendations, setRecommendations] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    const videoId = id;

    async function fetchVideo() {
      try {
        const [found, list] = await Promise.all([getVideoById(videoId), getVideoList()]);
        setVideo(found);
        const recList = list.filter((item) => item.id !== videoId).slice(0, 8);
        setRecommendations(recList.length > 0 ? recList : PLACEHOLDER_VIDEOS.slice(0, 8));
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
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          Loading video...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
          {error}
        </div>
      ) : video ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <VideoPlayer video={video} />
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{video.title}</h1>
                  <p className="mt-2 text-sm text-gray-600">{video.ownerName} · {video.views} views</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                  Like
                </button>
                <button className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
                  Share
                </button>
                <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
              <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <p>{video.description || 'No description available.'}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <CommentList videoId={video.id} />
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Recommended</h2>
              <p className="mt-2 text-sm text-gray-600">Popular videos you may like.</p>
              <div className="mt-5 space-y-4">
                {recommendations.map((item) => (
                  <Link key={item.id} to={`/watch/${item.id}`} className="block">
                    <VideoCard video={item} showDuration={false} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Live Chat</h2>
              <div className="mt-4">
                <ChatWindow videoId={video.id} />
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          Video not found.
        </div>
      )}
    </section>
  );
}

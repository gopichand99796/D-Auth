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
      setError('Failed to load video.');
      setLoading(false);
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
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
          {error}
        </div>
      ) : video ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <VideoPlayer video={video} />
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <CommentList videoId={video.id} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Live Chat</h2>
              <div className="mt-4">
                <ChatWindow videoId={video.id} />
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recommended</h2>
                <p className="text-sm text-gray-500">Other videos you may like.</p>
              </div>
              <div className="mt-5 space-y-4">
                {recommendations.map((item) => (
                  <Link key={item.id} to={`/watch/${item.id}`} className="block">
                    <VideoCard video={item} showDuration={false} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          Video not found.
        </div>
      )}
    </section>
  );
}

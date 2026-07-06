import { useState, useEffect } from 'react';
import { likeVideo, unlikeVideo, getVideoLikes } from '../services/like';
import { useAuth } from '../hooks/useAuth';

interface LikeButtonProps {
  videoId: string;
}

export default function LikeButton({ videoId }: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLikes();
  }, [videoId]);

  async function loadLikes() {
    try {
      setLoading(true);
      const count = await getVideoLikes(videoId);
      setLikes(count);
      setLiked(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleLike() {
    if (!user) {
      setError('Please login to like videos');
      return;
    }

    try {
      setError('');
      if (liked) {
        const count = await unlikeVideo(videoId);
        setLikes(count);
        setLiked(false);
      } else {
        const count = await likeVideo(videoId);
        setLikes(count);
        setLiked(true);
      }
    } catch (err) {
      setError('Failed to update like');
      console.error(err);
    }
  }

  if (loading) return null;

  return (
    <div>
      {error && (
        <p className="text-red-600 text-sm mb-2">{error}</p>
      )}
      <button
        onClick={handleToggleLike}
        className={`px-4 py-2 rounded font-semibold ${
          liked
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
        }`}
      >
        {liked ? '❤' : '🤍'} {likes} Like{likes !== 1 ? 's' : ''}
      </button>
    </div>
  );
}

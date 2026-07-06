import { useState, useEffect } from 'react';
import { subscribeToChannel, unsubscribeFromChannel, getChannelSubscribers } from '../services/subscription';
import { useAuth } from '../hooks/useAuth';

interface SubscribeButtonProps {
  channelId: string;
  channelName?: string;
}

export default function SubscribeButton({ channelId }: SubscribeButtonProps) {
  const { user } = useAuth();
  const [subscribed, setSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, [channelId]);

  async function loadSubscribers() {
    try {
      setLoading(true);
      const count = await getChannelSubscribers(channelId);
      setSubscribers(count);
      setSubscribed(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleSubscribe() {
    if (!user) {
      setError('Please login to subscribe');
      return;
    }

    if (user._id === channelId) {
      setError('You cannot subscribe to your own channel');
      return;
    }

    try {
      setError('');
      if (subscribed) {
        const count = await unsubscribeFromChannel(channelId);
        setSubscribers(count);
        setSubscribed(false);
      } else {
        const count = await subscribeToChannel(channelId);
        setSubscribers(count);
        setSubscribed(true);
      }
    } catch (err) {
      setError('Failed to update subscription');
      console.error(err);
    }
  }

  if (loading) return null;
  if (user?._id === channelId) return null;

  return (
    <div>
      {error && (
        <p className="text-red-600 text-sm mb-2">{error}</p>
      )}
      <div>
        <button
          onClick={handleToggleSubscribe}
          className={`px-4 py-2 rounded font-semibold ${
            subscribed
              ? 'bg-gray-400 text-white hover:bg-gray-500'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
        <p className="text-sm text-gray-600 mt-1">{subscribers} subscribers</p>
      </div>
    </div>
  );
}

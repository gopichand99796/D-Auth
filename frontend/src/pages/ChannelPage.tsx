import { useAuth } from '../hooks/useAuth';
import { PLACEHOLDER_VIDEOS } from '../data/placeholders';
import VideoGrid from '../components/VideoGrid';

export default function ChannelPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          Please log in to view your channel.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">{user.username}</h1>
            <p className="text-sm text-gray-600">Channel Name</p>
            <p className="text-sm font-medium text-gray-900">0 subscribers</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Videos</h2>
          <p className="text-sm text-gray-600">Your uploaded videos will appear here.</p>
        </div>
        <VideoGrid videos={PLACEHOLDER_VIDEOS.slice(0, 4)} />
      </div>
    </section>
  );
}

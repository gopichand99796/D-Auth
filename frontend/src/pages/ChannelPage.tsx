import { useAuth } from '../hooks/useAuth';
import { PLACEHOLDER_VIDEOS } from '../data/placeholders';
import VideoGrid from '../components/VideoGrid';

export default function ChannelPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Channel not available</h2>
          <p className="mt-2 text-sm text-gray-600">Please log in to view your channel page.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-semibold text-blue-700">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">{user.username}</h1>
            <p className="text-sm text-gray-600">Student creator channel</p>
            <p className="text-sm font-medium text-gray-900">0 subscribers</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Channel Videos</h2>
            <p className="mt-1 text-sm text-gray-600">Your uploaded content appears here.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">Sample videos shown</span>
        </div>
        <div className="mt-6">
          <VideoGrid videos={PLACEHOLDER_VIDEOS.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
}

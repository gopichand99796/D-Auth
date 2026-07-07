import VideoGrid from '../components/VideoGrid';
import { PLACEHOLDER_VIDEOS } from '../data/placeholders';

export default function HistoryPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Watch History</h1>
            <p className="mt-2 text-sm text-gray-600">Review recent videos you have watched on DTube.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Recent activity only
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recently Watched</h2>
          <p className="mt-1 text-sm text-gray-600">No history data? Sample videos appear here instead.</p>
        </div>
        <VideoGrid videos={PLACEHOLDER_VIDEOS.slice(0, 8)} />
      </div>
    </section>
  );
}

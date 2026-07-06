export default function EmptyState({ message }: { message?: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No videos uploaded yet</h3>
      <p className="mt-2 text-sm text-gray-600">
        {message || 'Be the first to upload a video and share it with the community.'}
      </p>
    </div>
  );
}

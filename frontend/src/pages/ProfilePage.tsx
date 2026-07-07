import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Profile unavailable</h2>
          <p className="mt-2 text-sm text-gray-600">Please log in to view your profile details.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6 py-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-semibold text-blue-700">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">{user.username}</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">0 subscribers</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">Student Creator</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Channel Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Channel Name</p>
            <p className="mt-2 text-sm font-medium text-gray-900">{user.username}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Email</p>
            <p className="mt-2 text-sm font-medium text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

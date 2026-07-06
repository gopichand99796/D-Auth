import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
          Please log in to view your profile.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900">{user.username}</h1>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Channel Info</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Channel Name</span>
            <span className="text-sm font-medium text-slate-900">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Subscribers</span>
            <span className="text-sm font-medium text-slate-900">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Email</span>
            <span className="text-sm font-medium text-slate-900">{user.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

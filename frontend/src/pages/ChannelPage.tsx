import { useAuth } from '../hooks/useAuth';

export default function ChannelPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
          Please log in to view your channel.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">{user.username}</h1>
            <p className="text-sm text-slate-600">Channel Name</p>
            <p className="text-sm font-medium text-slate-900">0 subscribers</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Videos</h2>
        <p className="mt-2 text-sm text-slate-600">Your uploaded videos will appear here.</p>
      </div>
    </section>
  );
}

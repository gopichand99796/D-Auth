import { useEffect, useState, useCallback } from 'react';
import {
  getAllUsers,
  getAllVideos,
  getAllComments,
  banUser,
  unbanUser,
  blockVideo,
  deleteVideo,
  hideComment,
  deleteComment,
} from '../services/admin';
import type { AdminUser, AdminVideo, AdminComment } from '../services/admin';
import { useAuth } from '../hooks/useAuth';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'videos' | 'comments'>('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [usersData, videosData, commentsData] = await Promise.all([
        getAllUsers(),
        getAllVideos(),
        getAllComments(),
      ]);
      setUsers(usersData);
      setVideos(videosData);
      setComments(commentsData);
    } catch (err) {
      setError('Failed to load admin data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleBanUser(userId: string) {
    try {
      await banUser(userId);
      setUsers((currentUsers) =>
        currentUsers.map((u) => (u._id === userId ? { ...u, isBanned: true } : u))
      );
    } catch (err) {
      setError('Failed to ban user.');
      console.error(err);
    }
  }

  async function handleUnbanUser(userId: string) {
    try {
      await unbanUser(userId);
      setUsers((currentUsers) =>
        currentUsers.map((u) => (u._id === userId ? { ...u, isBanned: false } : u))
      );
    } catch (err) {
      setError('Failed to unban user.');
      console.error(err);
    }
  }

  async function handleBlockVideo(videoId: string) {
    try {
      await blockVideo(videoId);
      setVideos((currentVideos) =>
        currentVideos.map((v) => (v._id === videoId ? { ...v, isBlocked: true } : v))
      );
    } catch (err) {
      setError('Failed to block video.');
      console.error(err);
    }
  }

  async function handleDeleteVideo(videoId: string) {
    try {
      await deleteVideo(videoId);
      setVideos((currentVideos) => currentVideos.filter((v) => v._id !== videoId));
    } catch (err) {
      setError('Failed to delete video.');
      console.error(err);
    }
  }

  async function handleHideComment(commentId: string) {
    try {
      await hideComment(commentId);
      setComments((currentComments) =>
        currentComments.map((c) => (c._id === commentId ? { ...c, isHidden: true } : c))
      );
    } catch (err) {
      setError('Failed to hide comment.');
      console.error(err);
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      await deleteComment(commentId);
      setComments((currentComments) => currentComments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment.');
      console.error(err);
    }
  }

  if (!user?.role || user.role !== 'admin') {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
        Access denied. Admin only.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Admin panel</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Moderation Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">Review users, videos, and comments in one place.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
            {users.length} users • {videos.length} videos • {comments.length} comments
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 rounded-3xl bg-slate-50 p-2">
        {(['users', 'videos', 'comments'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
          Loading admin data...
        </div>
      ) : activeTab === 'users' ? (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{u.username}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          u.isBanned ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {u.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {u.isBanned ? (
                        <button onClick={() => handleUnbanUser(u._id)} className="text-emerald-600 hover:underline">
                          Unban
                        </button>
                      ) : (
                        <button onClick={() => handleBanUser(u._id)} className="text-rose-600 hover:underline">
                          Ban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'videos' ? (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Video</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Owner</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {videos.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-slate-900">{v.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{v.ownerName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          v.isBlocked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {v.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-4">
                      <button onClick={() => handleBlockVideo(v._id)} className="text-slate-700 hover:underline">
                        {v.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button onClick={() => handleDeleteVideo(v._id)} className="text-rose-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Comment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {comments.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{c.user.username}</td>
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-slate-600">{c.text}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          c.isHidden ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {c.isHidden ? 'Hidden' : 'Visible'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-4">
                      <button onClick={() => handleHideComment(c._id)} className="text-slate-700 hover:underline">
                        {c.isHidden ? 'Show' : 'Hide'}
                      </button>
                      <button onClick={() => handleDeleteComment(c._id)} className="text-rose-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
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

  if (!user?.role || user.role !== 'admin') {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
        Access Denied. Admin only.
      </div>
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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
      setError('Failed to load admin data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleBanUser(userId: string) {
    try {
      await banUser(userId);
      setUsers(users.map((u) => (u._id === userId ? { ...u, isBanned: true } : u)));
    } catch (err) {
      setError('Failed to ban user');
      console.error(err);
    }
  }

  async function handleUnbanUser(userId: string) {
    try {
      await unbanUser(userId);
      setUsers(users.map((u) => (u._id === userId ? { ...u, isBanned: false } : u)));
    } catch (err) {
      setError('Failed to unban user');
      console.error(err);
    }
  }

  async function handleBlockVideo(videoId: string) {
    try {
      await blockVideo(videoId);
      setVideos(videos.map((v) => (v._id === videoId ? { ...v, isBlocked: true } : v)));
    } catch (err) {
      setError('Failed to block video');
      console.error(err);
    }
  }

  async function handleDeleteVideo(videoId: string) {
    try {
      await deleteVideo(videoId);
      setVideos(videos.filter((v) => v._id !== videoId));
    } catch (err) {
      setError('Failed to delete video');
      console.error(err);
    }
  }

  async function handleHideComment(commentId: string) {
    try {
      await hideComment(commentId);
      setComments(comments.map((c) => (c._id === commentId ? { ...c, isHidden: true } : c)));
    } catch (err) {
      setError('Failed to hide comment');
      console.error(err);
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">Manage users, videos, and comments.</p>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-2 text-sm text-gray-700">Admin controls</div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-red-700 shadow-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'users'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'videos'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Videos ({videos.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'comments'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Comments ({comments.length})
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : activeTab === 'users' ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Username</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{u.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        u.isBanned
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {u.isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.isBanned ? (
                      <button
                        onClick={() => handleUnbanUser(u._id)}
                        className="text-green-600 text-sm font-medium hover:underline"
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBanUser(u._id)}
                        className="text-red-600 text-sm font-medium hover:underline"
                      >
                        Ban
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : activeTab === 'videos' ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Owner</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 max-w-xs truncate text-sm text-gray-900">{v.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{v.ownerName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        v.isBlocked
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {v.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {v.isBlocked ? (
                      <>
                        <button
                          onClick={() => handleBlockVideo(v._id)}
                          className="text-green-600 text-sm font-medium hover:underline"
                        >
                          Unblock
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleBlockVideo(v._id)}
                        className="text-yellow-600 text-sm font-medium hover:underline"
                      >
                        Block
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteVideo(v._id)}
                      className="text-red-600 text-sm font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">User</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Comment</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c) => (
                <tr key={c._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{c.user.username}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-sm text-gray-600">
                    {c.text}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        c.isHidden
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {c.isHidden ? 'Hidden' : 'Visible'}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {c.isHidden ? (
                      <>
                        <button
                          onClick={() => handleHideComment(c._id)}
                          className="text-blue-600 text-sm font-medium hover:underline"
                        >
                          Show
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleHideComment(c._id)}
                        className="text-yellow-600 text-sm font-medium hover:underline"
                      >
                        Hide
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-red-600 text-sm font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

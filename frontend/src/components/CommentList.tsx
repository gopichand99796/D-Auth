import { useState, useEffect, useCallback } from 'react';
import type { Comment } from '../services/comment';
import { getCommentsByVideo, addComment as addCommentAPI, editComment as editCommentAPI, deleteComment as deleteCommentAPI } from '../services/comment';
import { useAuth } from '../hooks/useAuth';

interface CommentListProps {
  videoId: string;
}

export default function CommentList({ videoId }: CommentListProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getCommentsByVideo(videoId);
      setComments(data);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  async function handleAddComment() {
    if (!newComment.trim()) return;
    if (!user) {
      setError('Please login to comment');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const comment = await addCommentAPI(videoId, newComment);
      setComments([...comments, comment]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEditComment(commentId: string) {
    if (!editText.trim()) return;

    try {
      setError('');
      const updated = await editCommentAPI(commentId, editText);
      setComments(comments.map((c) => (c._id === commentId ? updated : c)));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      setError('Failed to edit comment');
      console.error(err);
    }
  }

  async function handleDeleteComment(commentId: string) {
    try {
      setError('');
      await deleteCommentAPI(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
      console.error(err);
    }
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Comments</h3>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-red-700 mb-4">
          {error}
        </div>
      )}

      {user && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Add a comment..."
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            disabled={submitting || !newComment.trim()}
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      )}

      {loading && <p className="text-gray-500 text-sm">Loading comments...</p>}

      {!loading && comments.length === 0 && (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="pb-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm text-gray-900">{comment.user.username}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              {user?._id === comment.user._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(comment._id);
                      setEditText(comment.text);
                    }}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {editingId === comment._id ? (
              <div className="mt-3">
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditComment(comment._id)}
                    className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditText('');
                    }}
                    className="rounded-lg bg-gray-300 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-800">{comment.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

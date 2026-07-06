import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../services/upload';
import Spinner from '../components/Spinner';

export default function UploadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setProgress(0);

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!videoFile) {
      setError('Video file is required.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('video', videoFile);

      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      setProgress(30);

      await uploadVideo(formData);

      setProgress(100);
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Upload Video</h1>
            <p className="mt-2 text-sm text-gray-600">Share your video with the community.</p>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-2 text-sm text-gray-700">
            Add title, description and file details before upload.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700">
          Title *
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows={4}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          >
            <option>General</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Music</option>
            <option>Technology</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Video File *
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            required
            disabled={loading}
            className="mt-2 w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 disabled:opacity-50"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Thumbnail Image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            disabled={loading}
            className="mt-2 w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 disabled:opacity-50"
          />
        </label>

        {videoFile && <p className="text-xs text-gray-600">Selected: {videoFile.name}</p>}

        {progress > 0 && progress < 100 && (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2">
            <div
              className="h-2 bg-blue-600 transition-all"
 style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Spinner /> : 'Upload'}
        </button>
      </form>
    </section>
  );
}

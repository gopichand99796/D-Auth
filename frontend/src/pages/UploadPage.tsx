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
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Upload</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Share your latest content</h1>
            <p className="mt-2 text-sm text-slate-500">Upload a video and let your channel grow with a clean, modern publishing flow.</p>
          </div>
          <div className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
            Fast · Secure · Mobile-friendly
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6">
          <label className="block text-sm font-medium text-slate-700">
            Title *
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows={5}
              className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
                className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option>General</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Music</option>
                <option>Technology</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Thumbnail Image (optional)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                disabled={loading}
                className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none file:cursor-pointer file:rounded-full file:border file:border-slate-300 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Video File *
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              required
              disabled={loading}
              className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none file:cursor-pointer file:rounded-full file:border file:border-slate-300 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>
        </div>

        {videoFile && <p className="text-sm text-slate-500">Selected video: {videoFile.name}</p>}

        {progress > 0 && progress < 100 && (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-2">
            <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Spinner /> : 'Upload Video'}
        </button>
      </form>
    </section>
  );
}

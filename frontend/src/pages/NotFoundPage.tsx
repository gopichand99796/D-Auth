import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center bg-[#f9f9f9] px-4 py-12">
      <div className="w-full rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-3 text-sm text-gray-600">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
          Return home
        </Link>
      </div>
    </div>
  );
}

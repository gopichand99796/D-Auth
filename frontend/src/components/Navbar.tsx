import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-gray-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">D</div>
          <span className="hidden sm:inline-block">DTube</span>
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <label htmlFor="search-input" className="sr-only">
              Search videos
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input
                id="search-input"
                type="search"
                placeholder="Search videos"
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/upload"
            className="hidden items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50 sm:flex"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
              <polyline points="7 10 12 5 17 10" />
              <line x1="12" y1="5" x2="12" y2="17" />
            </svg>
            Upload
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="text-sm font-medium text-gray-900">{user.username}</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

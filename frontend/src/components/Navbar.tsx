import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
            DTube
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-2xl">
            <label htmlFor="search-input" className="sr-only">
              Search videos
            </label>
            <input
              id="search-input"
              type="search"
              placeholder="Search videos"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="text-sm font-medium text-gray-900">{user.username}</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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

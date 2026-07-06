import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
            DTube
          </Link>
          <span className="hidden text-sm text-slate-500 sm:inline">Video sharing for college projects</span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <label htmlFor="search-input" className="sr-only">
              Search videos
            </label>
            <input
              id="search-input"
              type="search"
              placeholder="Search videos"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden min-w-[130px] flex-col text-sm sm:flex">
                <span className="font-medium text-slate-900">{user.username}</span>
                <span className="text-slate-500">{user.email}</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
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

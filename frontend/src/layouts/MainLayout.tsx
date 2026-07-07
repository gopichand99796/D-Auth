import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1400px] flex-col gap-4 px-4 py-4 md:flex-row">
        <aside className="sticky top-16 hidden h-fit w-full max-w-[260px] shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Outlet />
        </main>
      </div>
      <footer className="border-t border-gray-200 bg-[#f9f9f9] py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DTube. A student-built video platform UI.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-gray-900">Terms</span>
            <span className="hover:text-gray-900">Privacy</span>
            <span className="hover:text-gray-900">Help</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

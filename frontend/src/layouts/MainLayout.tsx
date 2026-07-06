import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1600px] flex-col gap-4 px-4 py-4 md:flex-row">
        <aside className="sticky top-20 hidden h-fit w-full max-w-[240px] shrink-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

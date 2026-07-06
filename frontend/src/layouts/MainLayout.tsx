import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-slate-900">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1400px] flex-col gap-4 px-4 py-4 md:flex-row">
        <aside className="sticky top-20 hidden h-fit w-full max-w-[260px] shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

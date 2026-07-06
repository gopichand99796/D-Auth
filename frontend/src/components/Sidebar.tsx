import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const publicNavItems = [
  { label: 'Home', to: '/' },
  { label: 'Trending', to: '/trending' },
];

const protectedNavItems = [
  { label: 'Upload', to: '/upload' },
  { label: 'My Channel', to: '/channel' },
  { label: 'Profile', to: '/profile' },
];

const adminNavItems = [{ label: 'Admin', to: '/admin' }];

export default function Sidebar() {
  const { user } = useAuth();
  let navItems = user ? [...publicNavItems, ...protectedNavItems] : publicNavItems;
  if (user?.role === 'admin') {
    navItems = [...navItems, ...adminNavItems];
  }

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
              isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          <span className="text-base text-blue-600">•</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

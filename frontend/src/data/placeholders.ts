import type { Video } from '../types';

export const PLACEHOLDER_VIDEOS: Video[] = [
  {
    id: 'placeholder-1',
    owner: 'channel-1',
    title: 'React Tutorial',
    description: 'Learn React from scratch with this comprehensive tutorial',
    category: 'Education',
    views: 1250,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Code Academy',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-2',
    owner: 'channel-2',
    title: 'Node.js Crash Course',
    description: 'Master Node.js in this intensive crash course',
    category: 'Programming',
    views: 3420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Backend Pro',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-3',
    owner: 'channel-3',
    title: 'Travel Vlog',
    description: 'Exploring beautiful destinations around the world',
    category: 'Lifestyle',
    views: 5680,
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Travel Tales',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-4',
    owner: 'channel-4',
    title: 'Gaming Highlights',
    description: 'Best gaming moments and epic plays',
    category: 'Gaming',
    views: 892,
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Game Zone',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-5',
    owner: 'channel-5',
    title: 'Cooking Recipe',
    description: 'Easy and delicious recipes for everyone',
    category: 'Food',
    views: 2145,
    thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Chef Kitchen',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-6',
    owner: 'channel-6',
    title: 'Nature Documentary',
    description: 'Discover the wonders of our natural world',
    category: 'Nature',
    views: 4320,
    thumbnailUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Nature Films',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-7',
    owner: 'channel-7',
    title: 'Music Mix',
    description: 'Relaxing music mix for studying and focus',
    category: 'Music',
    views: 3560,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Music Hub',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-8',
    owner: 'channel-8',
    title: 'Java DSA',
    description: 'Data Structures and Algorithms in Java',
    category: 'Education',
    views: 2890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'DSA Master',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-9',
    owner: 'channel-9',
    title: 'System Design Basics',
    description: 'Learn system design fundamentals',
    category: 'Technology',
    views: 1765,
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'System Design',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-10',
    owner: 'channel-10',
    title: 'Python Course',
    description: 'Complete Python programming course',
    category: 'Education',
    views: 2234,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Python Pro',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-11',
    owner: 'channel-11',
    title: 'AI News',
    description: 'Latest updates in artificial intelligence',
    category: 'Technology',
    views: 3456,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'AI Updates',
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-12',
    owner: 'channel-12',
    title: 'College Festival',
    description: 'Highlights from our annual college festival',
    category: 'Campus',
    views: 1890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Campus Events',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const getDuration = (): string => {
  const durations = ['12:34', '8:45', '15:22', '20:15', '18:30', '14:22', '11:45', '9:12', '16:55', '13:28'];
  return durations[Math.floor(Math.random() * durations.length)];
};

export const formatViewCount = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
  return date.toLocaleDateString();
};

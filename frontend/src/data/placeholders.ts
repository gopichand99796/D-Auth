import type { Video } from '../types';

export const PLACEHOLDER_VIDEOS: Video[] = [
  {
    id: 'placeholder-1',
    owner: 'channel-1',
    title: 'Introduction to Web Development with React',
    description: 'Learn the basics of React and modern web development',
    category: 'Education',
    views: 1250,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Tech Academy',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-2',
    owner: 'channel-2',
    title: 'College Campus Tour 2024',
    description: 'Explore our beautiful campus and facilities',
    category: 'Campus',
    views: 3420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1427504494785-cdedca239cc1?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Campus Life',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-3',
    owner: 'channel-3',
    title: 'JavaScript Tips and Tricks',
    description: 'Advanced JavaScript concepts explained simply',
    category: 'Programming',
    views: 5680,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Code Masters',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-4',
    owner: 'channel-4',
    title: 'Student Project Showcase',
    description: 'Amazing projects from students this semester',
    category: 'Projects',
    views: 892,
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Project Hub',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-5',
    owner: 'channel-5',
    title: 'Database Design Fundamentals',
    description: 'Learn how to design efficient databases',
    category: 'Database',
    views: 2145,
    thumbnailUrl: 'https://images.unsplash.com/photo-1524374645714-955f560ef26d?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'DB Tutorials',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-6',
    owner: 'channel-6',
    title: 'Cloud Computing Basics',
    description: 'Get started with cloud platforms',
    category: 'Cloud',
    views: 4320,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Cloud Academy',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-7',
    owner: 'channel-7',
    title: 'Machine Learning Introduction',
    description: 'Your first steps into machine learning',
    category: 'AI',
    views: 3560,
    thumbnailUrl: 'https://images.unsplash.com/photo-1605526881203-f35abed6cb47?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'AI Institute',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-8',
    owner: 'channel-8',
    title: 'Mobile Development with React Native',
    description: 'Build cross-platform mobile apps',
    category: 'Mobile',
    views: 2890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1607062826919-27240264c538?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Mobile Dev',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-9',
    owner: 'channel-9',
    title: 'Security Best Practices',
    description: 'Secure your applications and data',
    category: 'Security',
    views: 1765,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633886897202-d96d83f96d8f?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'Security Pro',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'placeholder-10',
    owner: 'channel-10',
    title: 'DevOps and CI/CD Pipeline',
    description: 'Automate your deployment workflow',
    category: 'DevOps',
    views: 2234,
    thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4817224c2d?w=400&h=225&fit=crop',
    videoUrl: '',
    ownerName: 'DevOps Labs',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
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

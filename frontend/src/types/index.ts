export type User = {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  role?: 'user' | 'admin';
};

export type Video = {
  id: string;
  owner: string;
  title: string;
  description: string;
  category: string;
  views: number;
  thumbnailUrl: string;
  videoUrl: string;
  ownerName: string;
  createdAt: string;
};

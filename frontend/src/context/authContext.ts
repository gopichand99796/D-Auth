import { createContext } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

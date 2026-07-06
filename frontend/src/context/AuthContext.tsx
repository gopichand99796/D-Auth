import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types';
import { loginUser, registerUser, getProfile } from '../services/auth';
import { setAuthToken } from '../services/api';

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

const AUTH_TOKEN_KEY = 'dtube_token';
const AUTH_USER_KEY = 'dtube_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (!storedToken || !storedUser) {
      setLoading(false);
      return;
    }

    setAuthToken(storedToken);
    getProfile()
      .then(() => {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      })
      .catch(() => {
        setAuthToken(null);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    setToken(response.token);
    setUser(response.user);
    setAuthToken(response.token);
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
  };

  const register = async (username: string, email: string, password: string) => {
    await registerUser(username, email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      register,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

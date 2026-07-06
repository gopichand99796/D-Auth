import api from './api';
import type { User } from '../types';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  message: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post('/auth/login', { email, password });
  return response.data as LoginResponse;
}

export async function registerUser(username: string, email: string, password: string): Promise<RegisterResponse> {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data as RegisterResponse;
}

export async function getProfile(): Promise<User> {
  const response = await api.get('/auth/profile');
  const data = response.data as { user: User };
  return data.user;
}

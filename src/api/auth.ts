import api from './axios';
import type { LoginRequest, RegisterRequest, User, UserSettings } from '../types/auth';

export const authApi = {
  // Login → Django sets HttpOnly cookies in the response
  login: (data: LoginRequest) =>
    api.post<{ user: User }>('/auth/login/', data).then((res) => res.data),

  // Register → Django sets HttpOnly cookies in the response
  register: (data: RegisterRequest) =>
    api.post<{ user: User }>('/auth/register/', data).then((res) => res.data),

  // Logout → Django clears the HttpOnly cookies
  logout: () =>
    api.post('/auth/logout/'),

  // Check current session (cookies are sent automatically)
  getMe: () =>
    api.get<User>('/auth/me/').then((res) => res.data),

  updateMe: (data: Partial<User>) =>
    api.patch<User>('/auth/me/', data).then((res) => res.data),

  getSettings: () =>
    api.get<UserSettings>('/auth/settings/').then((res) => res.data),

  updateSettings: (data: Partial<UserSettings>) =>
    api.patch<UserSettings>('/auth/settings/', data).then((res) => res.data),
};
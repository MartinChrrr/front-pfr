import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem(TOKEN_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// --- Request interceptor: inject Bearer token ---
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: auto-refresh on 401 ---
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  });
  failedQueue = [];
}

const SKIP_REFRESH_URLS = ["/auth/login/", "/auth/token/refresh/"];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      SKIP_REFRESH_URLS.some((url) => originalRequest.url?.includes(url))
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh/`,
        { refresh }
      );

      const newAccess: string = data.data.access;
      const newRefresh: string = data.data.refresh;
      setTokens(newAccess, newRefresh);

      processQueue(null, newAccess);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;

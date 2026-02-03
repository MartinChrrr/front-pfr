import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  // Tells the browser to send HttpOnly cookies with every request
  withCredentials: true,
});

// No request interceptor needed!
// The browser automatically attaches HttpOnly cookies.

// Handle 401 errors (expired access token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Django reads the refresh token from the HttpOnly cookie
        // and sets a new access token as a new HttpOnly cookie
        await axios.post(
          `${api.defaults.baseURL}/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );
        // Retry the original request (new cookie is already set)
        return api(originalRequest);
      } catch {
        // Refresh failed → redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, UserConfiguration } from "../types/auth";
import { getCurrentUser, login as apiLogin, logout as apiLogout } from "../api/auth";
import type { LoginRequest } from "../types/auth";
import { getAccessToken, clearTokens } from "../api/api";

interface AuthState {
  user: User | null;
  configuration: UserConfiguration | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    configuration: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshUser = useCallback(async () => {
    try {
      const { user, configuration } = await getCurrentUser();
      setState({ user, configuration, isAuthenticated: true, isLoading: false });
    } catch {
      clearTokens();
      setState({ user: null, configuration: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    if (getAccessToken()) {
      refreshUser();
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, [refreshUser]);

  const login = useCallback(
    async (data: LoginRequest) => {
      await apiLogin(data);
      await refreshUser();
    },
    [refreshUser]
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setState({ user: null, configuration: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

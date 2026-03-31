import api, { setTokens, clearTokens, getRefreshToken } from "./api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  UserConfiguration,
  ProfileUpdateRequest,
  ConfigurationUpdateRequest,
} from "../types/auth";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post("/auth/login/", data);
  const authData: AuthResponse = response.data.data;
  setTokens(authData.access, authData.refresh);
  return authData;
}

export async function register(data: RegisterRequest): Promise<User> {
  const response = await api.post("/auth/register/", data);
  return response.data.data;
}

export async function logout(): Promise<void> {
  const refresh = getRefreshToken();
  await api.post("/auth/logout/", { refresh });
  clearTokens();
}

export async function refreshToken(): Promise<{ access: string; refresh: string }> {
  const refresh = getRefreshToken();
  const response = await api.post("/auth/token/refresh/", { refresh });
  const tokens = response.data.data;
  setTokens(tokens.access, tokens.refresh);
  return tokens;
}

export async function getCurrentUser(): Promise<{ user: User; configuration: UserConfiguration }> {
  const response = await api.get("/auth/me/");
  const data = response.data.data;

  // If the API nests under { user, configuration }, use as-is
  if (data.user) {
    return data;
  }

  // Otherwise, the user fields are at root level — separate them
  const { configuration, ...user } = data;
  return { user: user as User, configuration };
}

export async function getProfile(): Promise<User> {
  const response = await api.get("/auth/profile/");
  return response.data.data;
}

export async function updateProfile(data: ProfileUpdateRequest): Promise<User> {
  const response = await api.patch("/auth/profile/", data);
  return response.data.data;
}

export async function getConfiguration(): Promise<UserConfiguration> {
  const response = await api.get("/auth/configuration/");
  return response.data.data;
}

export async function updateConfiguration(data: ConfigurationUpdateRequest): Promise<UserConfiguration> {
  const response = await api.patch("/auth/configuration/", data);
  return response.data.data;
}

import { describe, it, expect, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../test/mocks/server";
import { mockUser, mockConfiguration } from "../../test/mocks/handlers";
import { login, register, logout, getCurrentUser, getProfile, updateProfile } from "../auth";
import { getAccessToken, getRefreshToken } from "../api";

const BASE_URL = "http://localhost:8001/api";

describe("auth API", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("login", () => {
    it("stocke les tokens et retourne les donnees d'auth", async () => {
      const result = await login({ email: "test@example.com", password: "password123" });

      expect(result.access).toBe("fake-access-token");
      expect(result.refresh).toBe("fake-refresh-token");
      expect(result.user).toEqual(mockUser);
      expect(getAccessToken()).toBe("fake-access-token");
      expect(getRefreshToken()).toBe("fake-refresh-token");
    });

    it("propage les erreurs d'authentification", async () => {
      server.use(
        http.post(`${BASE_URL}/auth/login/`, () => {
          return HttpResponse.json(
            { status: "fail", data: { email: ["Identifiants invalides"] } },
            { status: 400 }
          );
        })
      );

      await expect(login({ email: "bad@example.com", password: "wrong" })).rejects.toThrow();
    });
  });

  describe("register", () => {
    it("retourne le user cree", async () => {
      const result = await register({
        email: "new@example.com",
        username: "newuser",
        password: "Str0ng!Pass",
        password_confirm: "Str0ng!Pass",
        first_name: "Jean",
        last_name: "Dupont",
      });

      expect(result).toEqual(mockUser);
    });
  });

  describe("logout", () => {
    it("supprime les tokens du localStorage", async () => {
      localStorage.setItem("access_token", "token");
      localStorage.setItem("refresh_token", "refresh");

      await logout();

      expect(getAccessToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();
    });
  });

  describe("getCurrentUser", () => {
    it("retourne user et configuration quand l'API neste sous { user, configuration }", async () => {
      localStorage.setItem("access_token", "token");

      const result = await getCurrentUser();

      expect(result.user).toEqual(mockUser);
      expect(result.configuration).toEqual(mockConfiguration);
    });

    it("separe user et configuration quand l'API retourne un objet plat", async () => {
      server.use(
        http.get(`${BASE_URL}/auth/me/`, () => {
          return HttpResponse.json({
            status: "success",
            data: { ...mockUser, configuration: mockConfiguration },
          });
        })
      );

      localStorage.setItem("access_token", "token");
      const result = await getCurrentUser();

      expect(result.user).toBeDefined();
      expect(result.configuration).toEqual(mockConfiguration);
    });
  });

  describe("getProfile", () => {
    it("retourne le profil utilisateur", async () => {
      localStorage.setItem("access_token", "token");

      const result = await getProfile();

      expect(result).toEqual(mockUser);
    });
  });

  describe("updateProfile", () => {
    it("met a jour le profil et retourne le user", async () => {
      localStorage.setItem("access_token", "token");

      const result = await updateProfile({ first_name: "Pierre" });

      expect(result).toEqual(mockUser);
    });
  });
});

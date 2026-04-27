import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import ProtectedRoute from "../ProtectedRoute";

function renderWithRouter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<p>Dashboard</p>} />
          </Route>
          <Route path="/login" element={<p>Login Page</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirige vers /login quand l'utilisateur n'est pas authentifie", async () => {
    renderWithRouter("/dashboard");

    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("affiche le contenu protege quand l'utilisateur est authentifie", async () => {
    localStorage.setItem("access_token", "valid-token");

    renderWithRouter("/dashboard");

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
});

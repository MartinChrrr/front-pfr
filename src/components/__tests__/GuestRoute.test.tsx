import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import GuestRoute from "../GuestRoute";

function renderWithRouter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AuthProvider>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<p>Login Page</p>} />
          </Route>
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("GuestRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("affiche le contenu guest quand l'utilisateur n'est pas authentifie", async () => {
    renderWithRouter("/login");

    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("redirige vers / quand l'utilisateur est authentifie", async () => {
    localStorage.setItem("access_token", "valid-token");

    renderWithRouter("/login");

    await waitFor(() => {
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../../../test/mocks/server";
import { AuthProvider } from "../../../hooks/useAuth";
import LoginForm from "../LoginForm";
import type { ReactNode } from "react";

const BASE_URL = "http://localhost:8001/api";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
}

function renderLoginForm() {
  return render(<LoginForm />, { wrapper });
}

describe("LoginForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("affiche les champs email et mot de passe", async () => {
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("@gmail.com")).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
  });

  it("affiche le bouton de connexion", async () => {
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Se connecter" })).toBeInTheDocument();
    });
  });

  it("affiche le lien vers l'inscription", async () => {
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    });
  });

  it("affiche les erreurs de validation cote client", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Se connecter" })).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Se connecter" }));

    await waitFor(() => {
      expect(screen.getByText("Email requis")).toBeInTheDocument();
    });
    expect(screen.getByText("Mot de passe requis")).toBeInTheDocument();
  });

  it("bascule la visibilite du mot de passe", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    });

    const passwordInput = screen.getByPlaceholderText("********");
    expect(passwordInput).toHaveAttribute("type", "password");

    // Cliquer sur le bouton de visibilite (l'icone Eye)
    const toggleButton = passwordInput.parentElement?.querySelector("button") as HTMLElement;
    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("affiche les erreurs serveur (400 JSend fail)", async () => {
    server.use(
      http.post(`${BASE_URL}/auth/login/`, () => {
        return HttpResponse.json(
          { status: "fail", data: { email: ["Identifiants invalides."] } },
          { status: 400 }
        );
      })
    );

    const user = userEvent.setup();
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("@gmail.com")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText("@gmail.com"), "bad@example.com");
    await user.type(screen.getByPlaceholderText("********"), "wrongpass");
    await user.click(screen.getByRole("button", { name: "Se connecter" }));

    await waitFor(() => {
      expect(screen.getByText("Identifiants invalides.")).toBeInTheDocument();
    });
  });

  it("affiche les erreurs serveur globales (500)", async () => {
    server.use(
      http.post(`${BASE_URL}/auth/login/`, () => {
        return HttpResponse.json(
          { status: "error", message: "Erreur interne du serveur" },
          { status: 500 }
        );
      })
    );

    const user = userEvent.setup();
    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("@gmail.com")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText("@gmail.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("********"), "password123");
    await user.click(screen.getByRole("button", { name: "Se connecter" }));

    await waitFor(() => {
      expect(screen.getByText("Erreur interne du serveur")).toBeInTheDocument();
    });
  });
});

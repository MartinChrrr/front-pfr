import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";
import type { ReactElement, ReactNode } from "react";

interface WrapperOptions {
  route?: string;
  withAuth?: boolean;
}

function createWrapper({ route = "/", withAuth = true }: WrapperOptions = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    const content = withAuth ? <AuthProvider>{children}</AuthProvider> : children;
    return <MemoryRouter initialEntries={[route]}>{content}</MemoryRouter>;
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: WrapperOptions & Omit<RenderOptions, "wrapper">
) {
  const { route, withAuth, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ route, withAuth }),
    ...renderOptions,
  });
}

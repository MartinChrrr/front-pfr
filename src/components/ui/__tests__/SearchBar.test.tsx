import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("affiche le placeholder par defaut", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(screen.getByPlaceholderText("Rechercher...")).toBeInTheDocument();
  });

  it("affiche un placeholder personnalise", () => {
    render(<SearchBar value="" onChange={vi.fn()} placeholder="Chercher un client..." />);

    expect(screen.getByPlaceholderText("Chercher un client...")).toBeInTheDocument();
  });

  it("affiche la valeur courante", () => {
    render(<SearchBar value="test" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  it("appelle onChange quand l'utilisateur tape", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "abc");

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith("a");
  });
});

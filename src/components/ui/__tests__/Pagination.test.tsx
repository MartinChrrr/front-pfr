import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../Pagination";

describe("Pagination", () => {
  it("n'affiche rien quand il n'y a qu'une seule page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container.innerHTML).toBe("");
  });

  it("affiche les numeros de pages pour un petit nombre de pages", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it("affiche des ellipses pour beaucoup de pages", () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={vi.fn()} />);

    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("appelle onPageChange avec le bon numero de page", async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();

    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    await user.click(screen.getByText("4"));

    expect(handlePageChange).toHaveBeenCalledWith(4);
  });

  it("desactive les boutons precedent sur la premiere page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);

    const buttons = screen.getAllByRole("button");
    // Premier et deuxieme boutons (first page, previous page)
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it("desactive les boutons suivant sur la derniere page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);

    const buttons = screen.getAllByRole("button");
    const lastIdx = buttons.length - 1;
    expect(buttons[lastIdx]).toBeDisabled();
    expect(buttons[lastIdx - 1]).toBeDisabled();
  });

  it("navigue a la premiere page avec le bouton ChevronsLeft", async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();

    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]); // ChevronsLeft

    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it("navigue a la derniere page avec le bouton ChevronsRight", async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();

    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[buttons.length - 1]); // ChevronsRight

    expect(handlePageChange).toHaveBeenCalledWith(5);
  });
});

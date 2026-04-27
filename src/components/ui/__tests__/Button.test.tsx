import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button", () => {
  it("affiche le contenu enfant", () => {
    render(<Button>Cliquez ici</Button>);

    expect(screen.getByRole("button", { name: "Cliquez ici" })).toBeInTheDocument();
  });

  it("utilise la variante primary par defaut", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");

    expect(btn.className).toContain("bg-primary-500");
  });

  it("applique la variante outline", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button");

    expect(btn.className).toContain("bg-white");
  });

  it("passe les props HTML au bouton", () => {
    render(<Button disabled type="submit">Submit</Button>);
    const btn = screen.getByRole("button");

    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("applique les classes CSS additionnelles", () => {
    render(<Button className="custom-class">Custom</Button>);
    const btn = screen.getByRole("button");

    expect(btn.className).toContain("custom-class");
  });

  it("appelle onClick quand on clique", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("n'appelle pas onClick quand le bouton est disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "../StatusBadge";

describe("StatusBadge", () => {
  const statuses = [
    { status: "BROUILLON" as const, label: "Brouillon" },
    { status: "ENVOYE" as const, label: "En attente" },
    { status: "ACCEPTE" as const, label: "Accepté" },
    { status: "REFUSE" as const, label: "Refusé" },
    { status: "EXPIRE" as const, label: "Expiré" },
    { status: "ENVOYEE" as const, label: "Envoyée" },
    { status: "PAYEE" as const, label: "Payée" },
    { status: "EN_RETARD" as const, label: "En retard" },
  ];

  it.each(statuses)(
    "affiche le label '$label' pour le statut '$status'",
    ({ status, label }) => {
      render(<StatusBadge status={status} />);

      expect(screen.getByText(label)).toBeInTheDocument();
    }
  );

  it("applique la taille md par defaut", () => {
    render(<StatusBadge status="BROUILLON" />);
    const badge = screen.getByText("Brouillon");

    expect(badge.className).toContain("text-caption");
  });

  it("applique la taille sm", () => {
    render(<StatusBadge status="BROUILLON" size="sm" />);
    const badge = screen.getByText("Brouillon");

    expect(badge.className).toContain("text-small-medium");
  });

  it("applique la taille lg", () => {
    render(<StatusBadge status="BROUILLON" size="lg" />);
    const badge = screen.getByText("Brouillon");

    expect(badge.className).toContain("text-body");
  });

  it("applique les classes de couleur pour succes (ACCEPTE)", () => {
    render(<StatusBadge status="ACCEPTE" />);
    const badge = screen.getByText("Accepté");

    expect(badge.className).toContain("text-success");
    expect(badge.className).toContain("border-success");
  });

  it("applique les classes de couleur pour alerte (REFUSE)", () => {
    render(<StatusBadge status="REFUSE" />);
    const badge = screen.getByText("Refusé");

    expect(badge.className).toContain("text-alert");
    expect(badge.className).toContain("border-alert");
  });

  it("applique les classes de couleur pour en attente (ENVOYE)", () => {
    render(<StatusBadge status="ENVOYE" />);
    const badge = screen.getByText("En attente");

    expect(badge.className).toContain("text-pending");
    expect(badge.className).toContain("border-pending");
  });
});

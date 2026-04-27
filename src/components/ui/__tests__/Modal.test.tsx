import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";

const defaultProps = {
  title: "Titre Modal",
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
};

describe("Modal", () => {
  it("n'affiche rien quand isOpen est false", () => {
    render(
      <Modal {...defaultProps} isOpen={false}>
        <p>Contenu</p>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("affiche le titre et le contenu quand isOpen est true", () => {
    render(
      <Modal {...defaultProps}>
        <p>Contenu de la modal</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Titre Modal")).toBeInTheDocument();
    expect(screen.getByText("Contenu de la modal")).toBeInTheDocument();
  });

  it("affiche les labels par defaut pour les boutons", () => {
    render(
      <Modal {...defaultProps}>
        <p>Test</p>
      </Modal>
    );

    expect(screen.getByText("Annuler")).toBeInTheDocument();
    expect(screen.getByText("Enregistrer les modifications")).toBeInTheDocument();
  });

  it("accepte des labels personnalises", () => {
    render(
      <Modal {...defaultProps} confirmLabel="Supprimer" cancelLabel="Non merci">
        <p>Test</p>
      </Modal>
    );

    expect(screen.getByText("Non merci")).toBeInTheDocument();
    expect(screen.getByText("Supprimer")).toBeInTheDocument();
  });

  it("appelle onClose quand on clique sur Annuler", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    await user.click(screen.getByText("Annuler"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("appelle onConfirm quand on clique sur le bouton de confirmation", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <Modal {...defaultProps} onConfirm={onConfirm}>
        <p>Test</p>
      </Modal>
    );

    await user.click(screen.getByText("Enregistrer les modifications"));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("appelle onClose quand on clique sur le bouton de fermeture (X)", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    await user.click(screen.getByLabelText("Fermer la modal"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("appelle onClose quand on appuie sur Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("appelle onClose quand on clique sur l'overlay", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal {...defaultProps} onClose={onClose}>
        <p>Test</p>
      </Modal>
    );

    // L'overlay est le premier div avec bg-black/60
    const overlay = document.querySelector(".bg-black\\/60") as HTMLElement;
    await user.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

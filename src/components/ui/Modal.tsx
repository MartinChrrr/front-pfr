import { ReactNode } from "react";
import { X } from "lucide-react";
import Button from "./Button";

type ModalProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
};

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = "Enregistrer les modifications",
  cancelLabel = "Annuler",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 ">
        <div className="w-full max-w-4xl rounded-lg bg-bg-primary shadow-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-text-placeholder px-6 py-4">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="text-black/60 hover:text-black transition"
              aria-label="Fermer la modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 flex flex-col gap-5">
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4">
            <Button variant="outline" onClick={onClose}>
              {cancelLabel}
            </Button>

            <Button onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

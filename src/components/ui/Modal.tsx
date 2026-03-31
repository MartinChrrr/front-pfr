import { ReactNode, useEffect, useRef, useCallback } from "react";
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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = "Enregistrer les modifications",
  cancelLabel = "Annuler",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, handleKeyDown]);

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
        <div ref={modalRef} role="dialog" aria-modal="true" className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-bg-primary shadow-xl">

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-text-placeholder px-6 py-4">
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
          <div className="overflow-y-auto px-6 py-4 flex flex-col gap-5">
            {children}
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-text-placeholder px-6 py-4">
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

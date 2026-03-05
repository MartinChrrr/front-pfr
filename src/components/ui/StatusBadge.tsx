import type { QuoteStatus } from "../../types/quote";
import type { InvoiceStatus } from "../../types/invoice";

type Status = QuoteStatus | InvoiceStatus;

const statusConfig: Record<Status, { label: string; classes: string }> = {
  REFUSE: { label: "Refusé", classes: "border-alert text-alert" },
  ACCEPTE: { label: "Accepté", classes: "border-success text-success" },
  ENVOYE: { label: "En attente", classes: "border-pending text-pending" },
  BROUILLON: { label: "Brouillon", classes: "border-unselected text-text-black" },
  EXPIRE: { label: "Expiré", classes: "border-alert text-alert" },
  ENVOYEE: { label: "Envoyée", classes: "border-pending text-pending" },
  PAYEE: { label: "Payée", classes: "border-success text-success" },
  EN_RETARD: { label: "En retard", classes: "border-alert text-alert" },
};

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-1 text-small-medium",
  md: "px-2.5 py-2 text-caption",
  lg: "px-3 py-2.5 text-body",
};

interface StatusBadgeProps {
  status: Status;
  size?: Size;
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const { label, classes } = statusConfig[status];

  return (
    <span className={`inline-flex items-center justify-center border rounded-2xl w-fit font-medium ${sizeClasses[size]} ${classes}`}>
      {label}
    </span>
  );
}

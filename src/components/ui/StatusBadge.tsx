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

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes } = statusConfig[status];

  return (
    <span className={`inline-flex items-center justify-center border rounded-2xl px-2.5 py-2 w-fit text-caption font-medium ${classes}`}>
      {label}
    </span>
  );
}

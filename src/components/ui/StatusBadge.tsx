import type { QuoteStatus } from "../../types/quote";

const statusConfig: Record<QuoteStatus, { label: string; classes: string }> = {
  REFUSE: { label: "Non payé", classes: "border-alert text-alert" },
  ACCEPTE: { label: "Payé", classes: "border-success text-success" },
  ENVOYE: { label: "En attente", classes: "border-pending text-pending" },
  BROUILLON: { label: "Brouillon", classes: "border-unselected text-text-black" },
  EXPIRE: { label: "Expiré", classes: "border-alert text-alert" },
};

interface StatusBadgeProps {
  status: QuoteStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes } = statusConfig[status];

  return (
    <span className={`inline-flex items-center justify-center border rounded-2xl px-2.5 py-2 w-fit text-caption font-medium ${classes}`}>
      {label}
    </span>
  );
}

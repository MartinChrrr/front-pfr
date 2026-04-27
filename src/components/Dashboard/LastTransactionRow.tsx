import { formatDateFR } from "../../utils/mappers";
import type { Invoice } from "../../types/invoice";

interface LastTransactionRowProps {
  invoice: Invoice;
}

export default function LastTransactionRow({ invoice }: LastTransactionRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <p className="text-caption">{formatDateFR(invoice.updated_at.split("T")[0])}</p>
      <p className="text-caption">{invoice.numero} - {invoice.client.raison_sociale}</p>
      <p className="text-caption font-medium text-green-600">+{Number(invoice.total_ttc).toFixed(2)}€</p>
    </div>
  );
}

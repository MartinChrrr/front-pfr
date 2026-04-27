import { formatDateFR } from "../../utils/mappers";
import type { LastTransaction } from "../../api/dashboard";

interface LastTransactionRowProps {
  transaction: LastTransaction;
}

export default function LastTransactionRow({ transaction }: LastTransactionRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 min-h-22">
      <p className="font-medium">{formatDateFR(transaction.updated_at.split("T")[0])}</p>
      <p className="">{transaction.numero} - {transaction.client}</p>
      <p className="font-medium text-green-600">+{parseFloat(transaction.total_ttc).toFixed(2)}€</p>
    </div>
  );
}

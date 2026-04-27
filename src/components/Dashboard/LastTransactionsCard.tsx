import Card from "../ui/Card";
import LastTransactionRow from "./LastTransactionRow";
import type { Invoice } from "../../types/invoice";

interface LastTransactionsCardProps {
  transactions: Invoice[];
  className?: string;
}

export default function LastTransactionsCard({ transactions, className = "flex-1" }: LastTransactionsCardProps) {
  return (
    <Card title="Dernières transactions" className={className}>
      {transactions.length === 0 ? (
        <p className="text-center italic">Aucune transaction</p>
      ) : (
        transactions.map((invoice) => (
          <LastTransactionRow key={invoice.id} invoice={invoice} />
        ))
      )}
    </Card>
  );
}

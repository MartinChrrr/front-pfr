import Card from "../ui/Card";
import LastTransactionRow from "./LastTransactionRow";
import type { LastTransaction } from "../../api/dashboard";

interface LastTransactionsCardProps {
  transactions: LastTransaction[];
  className?: string;
}

export default function LastTransactionsCard({ transactions, className = "flex-1" }: LastTransactionsCardProps) {
  return (
    <Card title="Dernières transactions" className={className}>
      {transactions.length === 0 ? (
        <p className="text-center italic">Aucune transaction</p>
      ) : (
        transactions.map((transaction) => (
          <LastTransactionRow key={transaction.id} transaction={transaction} />
        ))
      )}
    </Card>
  );
}

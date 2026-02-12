import { EllipsisVertical } from "lucide-react";
import type { QuoteStatus } from "../../types/quote";
import StatusBadge from "./StatusBadge";

export interface DevisRow {
  id: number;
  number: string;
  date: string;
  client: string;
  echeance: string;
  status: QuoteStatus;
  ttc: number;
}

interface DevisTableProps {
  rows: DevisRow[];
  onMore?: (id: number) => void;
}

const gridCols = "grid-cols-[0.6fr_1fr_1.5fr_1fr_1fr_0.8fr_40px]";

const headers = ["N°", "Date", "Client", "Échéance", "Status", "TTC"] as const;

export default function DevisTable({ rows, onMore }: DevisTableProps) {
  return (
    <div className="w-full">
      <div className={`grid ${gridCols} items-center px-[30px] py-2`}>
        {headers.map((label) => (
          <span key={label} className="text-caption font-medium text-text-black">
            {label}
          </span>
        ))}
        <span />
      </div>

      {rows.map((row, i) => (
        <div
          key={row.id}
          className={`grid ${gridCols} items-center px-[30px] py-5 rounded-md bg-table-1 hover:bg-table-2 transition-colors`}
        >
          <span className="text-caption font-medium">{row.number}</span>
          <span className="text-caption font-medium">{row.date}</span>
          <span className="text-caption font-medium truncate pr-4">{row.client}</span>
          <span className="text-caption font-medium">{row.echeance}</span>
          <StatusBadge status={row.status} />
          <span className="text-caption font-medium">{row.ttc.toFixed(2)} €</span>
          <button
            onClick={() => onMore?.(row.id)}
            className="flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 transition-colors cursor-pointer"
          >
            <EllipsisVertical size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

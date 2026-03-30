import FactureRow from "./FactureRow";
import type { FactureRowData } from "./FactureRow";
import type { DropdownItem } from "../DropdownButton";

export type { FactureRowData as FactureRow };

interface FacturesTableProps {
  rows: FactureRowData[];
  menuItems?: (id: number) => DropdownItem[];
}

const gridCols = "grid-cols-[0.6fr_1fr_1.5fr_1fr_1fr_0.8fr_40px]";

const headers = ["N°", "Date", "Client", "Échéance", "Status", "TTC"] as const;

export default function FacturesTable({ rows, menuItems }: FacturesTableProps) {
  return (
    <div className="w-full rounded-lg border border-black overflow-visible divide-y divide-black">
      <div className={`grid ${gridCols} items-center px-[30px] py-5`}>
        {headers.map((label) => (
          <span key={label} className="text-caption font-medium text-text-black">
            {label}
          </span>
        ))}
        <span />
      </div>

      {rows.map((row) => (
        <FactureRow key={row.id} row={row} gridCols={gridCols} menuItems={menuItems} />
      ))}
    </div>
  );
}

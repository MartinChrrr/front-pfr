import FactureRow from "./FactureRow";
import type { FactureRowData } from "./FactureRow";
import type { DropdownItem } from "../DropdownButton";

export type { FactureRowData as FactureRow };

interface FacturesTableProps {
  rows: FactureRowData[];
  menuItems?: (row: FactureRowData) => DropdownItem[];
}

const gridCols = "grid-cols-[1fr_1.5fr_1fr] md:grid-cols-[0.6fr_1fr_1.5fr_1fr_1fr_0.8fr_40px]";

export default function FacturesTable({ rows, menuItems }: FacturesTableProps) {
  return (
    <div className="w-full rounded-lg border border-black overflow-visible divide-y divide-black">
      <div className={`grid ${gridCols} items-center px-4 md:px-[30px] py-5`}>
        <span className="hidden md:block text-caption font-medium text-text-black">N°</span>
        <span className="text-caption font-medium text-text-black">Date</span>
        <span className="text-caption font-medium text-text-black">Client</span>
        <span className="hidden md:block text-caption font-medium text-text-black">Échéance</span>
        <span className="text-caption font-medium text-text-black">Status</span>
        <span className="hidden md:block text-caption font-medium text-text-black">TTC</span>
        <span className="hidden md:block" />
      </div>

      {rows.map((row) => (
        <FactureRow key={row.id} row={row} gridCols={gridCols} menuItems={menuItems} />
      ))}
    </div>
  );
}

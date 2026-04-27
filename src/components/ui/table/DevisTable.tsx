import DevisRow from "./DevisRow";
import type { DevisRowData } from "./DevisRow";
import type { DropdownItem } from "../DropdownButton";

export type { DevisRowData as DevisRow };

interface DevisTableProps {
  rows: DevisRowData[];
  menuItems?: (row: DevisRowData) => DropdownItem[];
}

const gridCols = "grid-cols-[1fr_1.5fr_1fr] md:grid-cols-[0.6fr_1fr_1.5fr_1fr_1fr_0.8fr_40px]";

export default function DevisTable({ rows, menuItems }: DevisTableProps) {
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
        <DevisRow key={row.id} row={row} gridCols={gridCols} menuItems={menuItems} />
      ))}
    </div>
  );
}

import ClientRow from "./ClientRow";
import type { ClientRowData } from "./ClientRow";
import type { DropdownItem } from "../DropdownButton";

export type { ClientRowData as ClientRow };

interface ClientsTableProps {
  rows: ClientRowData[];
  menuItems?: (id: number) => DropdownItem[];
}

const gridCols = "grid-cols-[1.2fr_1.5fr_1.5fr_1fr_40px]";

const headers = ["Nom", "Entreprise", "Email", "Téléphone"] as const;

export default function ClientsTable({ rows, menuItems }: ClientsTableProps) {
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
        <ClientRow key={row.id} row={row} gridCols={gridCols} menuItems={menuItems} />
      ))}
    </div>
  );
}

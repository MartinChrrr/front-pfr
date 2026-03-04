import { NavLink } from "react-router-dom";
import type { QuoteStatus } from "../../../types/quote";
import StatusBadge from "../StatusBadge";
import DropdownButton, { type DropdownItem } from "../DropdownButton";

export interface DevisRowData {
  id: number;
  number: string;
  date: string;
  client: string;
  echeance: string;
  status: QuoteStatus;
  ttc: number;
}

interface DevisRowProps {
  row: DevisRowData;
  gridCols: string;
  menuItems?: (id: number) => DropdownItem[];
}

export default function DevisRow({ row, gridCols, menuItems }: DevisRowProps) {
  return (
    <NavLink
      to={`/devis/${row.id}`}
      className={`grid ${gridCols} items-center px-[30px] py-5 hover:bg-table-2 transition-colors`}
    >
      <span className="text-caption font-medium">{row.number}</span>
      <span className="text-caption font-medium">{row.date}</span>
      <span className="text-caption font-medium truncate pr-4">{row.client}</span>
      <span className="text-caption font-medium">{row.echeance}</span>
      <StatusBadge status={row.status} />
      <span className="text-caption font-medium">{row.ttc.toFixed(2)} €</span>
      {menuItems && <DropdownButton items={menuItems(row.id)} />}
    </NavLink>
  );
}

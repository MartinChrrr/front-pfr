import { NavLink } from "react-router-dom";
import type { InvoiceStatus } from "../../../types/invoice";
import StatusBadge from "../StatusBadge";
import DropdownButton, { type DropdownItem } from "../DropdownButton";

export interface FactureRowData {
  id: number;
  number: string;
  date: string;
  client: string;
  echeance: string;
  status: InvoiceStatus;
  ttc: number;
}

interface FactureRowProps {
  row: FactureRowData;
  gridCols: string;
  menuItems?: (row: FactureRowData) => DropdownItem[];
}

export default function FactureRow({ row, gridCols, menuItems }: FactureRowProps) {
  return (
    <NavLink
      to={`/factures/${row.id}`}
      className={`grid ${gridCols} items-center px-4 md:px-[30px] py-5 hover:bg-table-2 transition-colors last:rounded-b-lg`}
    >
      <span className={`hidden md:block text-caption font-medium ${row.number ? "" : "italic"}`}>
        {row.number ? row.number : "Non renseigné"}
      </span>
      <span className={`text-caption font-medium ${row.date ? "" : "italic"}`}>
        {row.date ? row.date : "Non renseigné"}
      </span>
      <span className={`text-caption font-medium truncate pr-4 ${row.client ? "" : "italic"}`}>
        {row.client ? row.client : "Non renseigné"}
      </span>
      <span className={`hidden md:block text-caption font-medium ${row.echeance ? "" : "italic"}`}>
        {row.echeance ? row.echeance : "Non renseigné"}
      </span>
      <StatusBadge status={row.status} />
      <span className="hidden md:block text-caption font-medium">{row.ttc.toFixed(2)} €</span>
      {menuItems && <div className="hidden md:block"><DropdownButton items={menuItems(row)} /></div>}
    </NavLink>
  );
}

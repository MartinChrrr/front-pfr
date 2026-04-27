import { NavLink } from "react-router-dom";
import DropdownButton, { type DropdownItem } from "../DropdownButton";

export interface ClientRowData {
  id: number;
  contact_name: string;
  company_name: string;
  email: string;
  phone: string;
}

interface ClientRowProps {
  row: ClientRowData;
  gridCols: string;
  menuItems?: (id: number) => DropdownItem[];
}

export default function ClientRow({ row, gridCols, menuItems }: ClientRowProps) {
  return (
    <NavLink
      to={`/clients/${row.id}`}
      className={`grid ${gridCols} items-center px-4 md:px-[30px] py-5 hover:bg-table-2 transition-colors last:rounded-b-lg`}
    >
      {/* Conditional class : if contact_name exists, no italic, otherwise italic is applied */}
      <span className={`text-caption font-medium truncate pr-4 ${row.contact_name ? "" : "italic"}`}>
        {row.contact_name ? row.contact_name : "Non renseigné"}
      </span>
      <span className={`text-caption font-medium truncate pr-4 ${row.company_name ? "" : "italic"}`}>
        {row.company_name ? row.company_name : "Non renseigné"}
      </span>
      <span className={`text-caption font-medium truncate pr-4 ${row.email ? "" : "italic"}`}>
        {row.email ? row.email : "Non renseigné"}
      </span>
      <span className={`hidden md:block text-caption font-medium ${row.phone ? "" : "italic"}`}>
        {row.phone ? row.phone : "Non renseigné"}
      </span>
      {menuItems && <div className="hidden md:block"><DropdownButton items={menuItems(row.id)} /></div>}
    </NavLink>
  );
}

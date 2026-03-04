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
      className={`grid ${gridCols} items-center px-[30px] py-5 hover:bg-table-2 transition-colors`}
    >
      <span className="text-caption font-medium truncate pr-4">{row.contact_name}</span>
      <span className="text-caption font-medium truncate pr-4">{row.company_name}</span>
      <span className="text-caption font-medium truncate pr-4">{row.email}</span>
      <span className="text-caption font-medium">{row.phone}</span>
      {menuItems && <DropdownButton items={menuItems(row.id)} />}
    </NavLink>
  );
}

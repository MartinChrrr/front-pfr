import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  label: string;
  icon: LucideIcon;
  to: string;
};

export default function SidebarItem({
  label,
  icon: Icon,
  to,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex w-full items-center gap-2 rounded-[10px] px-[10px] py-[9.5px]
        transition-colors duration-300 ease-out
        ${isActive ? "bg-primary-300" : "bg-primary-500 hover:bg-primary-700"}
        `
      }
    >
      <Icon size={24} strokeWidth={1.5} className="shrink-0 text-white" />
      <span className="text-[13px] font-medium leading-[20px] text-white">
        {label}
      </span>
    </NavLink>
  );
}

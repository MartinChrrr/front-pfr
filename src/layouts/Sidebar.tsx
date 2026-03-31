import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarItemGroup from "./SidebarItemGroup";
import SidebarProfile from "./SidebarProfile";

type SidebarItemEntry = {
  type: "item";
  label: string;
  icon: LucideIcon;
  to: string;
};

type SidebarGroupEntry = {
  type: "group";
  label: string;
  icon: LucideIcon;
  subItems: { label: string; to?: string; onClick?: () => void }[];
  defaultOpen?: boolean;
};

type SidebarEntry = SidebarItemEntry | SidebarGroupEntry;

type SidebarProps = {
  items: SidebarEntry[];
  logo?: React.ReactNode;
  onLogout?: () => void;
};

export default function Sidebar({
  items,
  logo,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-[268px] flex-col justify-between bg-primary-500 p-4">
      <div className="flex flex-col gap-4">
        {logo && <div className="px-[10px] py-2">{logo}</div>}

        <nav className="flex flex-col gap-1">
          {items.map((entry) =>
            entry.type === "item" ? (
              <SidebarItem
                key={entry.label}
                label={entry.label}
                icon={entry.icon}
                to={entry.to}
              />
            ) : (
              <SidebarItemGroup
                key={entry.label}
                label={entry.label}
                icon={entry.icon}
                subItems={entry.subItems}
                defaultOpen={entry.defaultOpen}
              />
            ),
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <SidebarProfile />

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-[10px] px-[10px] py-[9.5px] transition-colors duration-300 ease-out hover:bg-primary-700 cursor-pointer"
        >
          <LogOut size={24} strokeWidth={1.5} className="shrink-0 text-white" />
          <span className="text-[13px] font-medium leading-[20px] text-white">
            Se déconnecter
          </span>
        </button>
      </div>
    </aside>
  );
}

export type { SidebarEntry, SidebarItemEntry, SidebarGroupEntry, SidebarProps };

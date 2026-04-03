import type { LucideIcon } from "lucide-react";
import { LogOut, X } from "lucide-react";
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
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

export default function Sidebar({
  items,
  logo,
  onLogout,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const sidebarContent = (
    <aside className="flex h-full w-[268px] flex-col justify-between bg-primary-500 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-[10px] py-2">
          {logo}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden rounded-lg p-1 text-white hover:bg-primary-700 transition-colors cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          )}
        </div>

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

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        {sidebarContent}
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onCloseMobile}
            onKeyDown={(e) => e.key === "Escape" && onCloseMobile?.()}
          />
          <div className="relative z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export type { SidebarEntry, SidebarItemEntry, SidebarGroupEntry, SidebarProps };

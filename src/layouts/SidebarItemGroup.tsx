import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SubItem = {
  label: string;
  to?: string;
  onClick?: () => void;
};

type SidebarItemGroupProps = {
  label: string;
  icon: LucideIcon;
  subItems: SubItem[];
  defaultOpen?: boolean;
};

export default function SidebarItemGroup({
  label,
  icon: Icon,
  subItems,
  defaultOpen = false,
}: SidebarItemGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-[10px]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-lg px-[10px] py-[9.5px] bg-primary-500 hover:bg-primary-700 transition-colors duration-300 ease-out cursor-pointer"
      >
        <Icon size={24} strokeWidth={1.5} className="shrink-0 text-white" />
        <span className="text-[13px] font-medium leading-[20px] text-white">
          {label}
        </span>
        <ChevronDown
          size={24}
          strokeWidth={1.5}
          className={`ml-auto shrink-0 text-white transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-px px-[5px]">
          {subItems.map((item) => {
            const className =
              "flex items-center rounded-lg px-10 py-[11.5px] transition-colors duration-300 ease-out cursor-pointer";

            return item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `${className} ${isActive ? "bg-primary-300" : "bg-primary-500 hover:bg-primary-700"}`
                }
              >
                <span className="text-[13px] font-medium leading-[20px] text-white">
                  {item.label}
                </span>
              </NavLink>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className={`${className} bg-primary-500 hover:bg-primary-700`}
              >
                <span className="text-[13px] font-medium leading-[20px] text-white">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

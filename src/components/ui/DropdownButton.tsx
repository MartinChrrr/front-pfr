import { useState, useRef, useEffect, type ReactNode } from "react";
import { EllipsisVertical } from "lucide-react";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownButtonProps {
  items: DropdownItem[];
  iconSize?: number;
}

export default function DropdownButton({
  items,
  iconSize = 16,
}: DropdownButtonProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 200);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 transition-colors cursor-pointer"
      >
        <EllipsisVertical size={iconSize} />
      </button>

      {open && (
        <div className={`absolute right-0 z-50 min-w-[180px] bg-white rounded-lg shadow-lg py-1 ${dropUp ? "bottom-full mb-1" : "top-full mt-1"}`}>
          {items.map((item) => (
            <button
              key={item.label}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
                item.onClick();
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-black/5 transition-colors cursor-pointer"
            >
              {item.icon && (
                <span className="flex items-center justify-center w-5 h-5">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

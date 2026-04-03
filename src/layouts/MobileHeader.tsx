import { Menu } from "lucide-react";

type MobileHeaderProps = {
  logo?: React.ReactNode;
  onOpenMenu: () => void;
};

export default function MobileHeader({ logo, onOpenMenu }: MobileHeaderProps) {
  return (
    <header className="flex md:hidden items-center justify-between bg-primary-500 px-4 py-3">
      {logo && <div>{logo}</div>}
      <button
        type="button"
        onClick={onOpenMenu}
        className="rounded-lg p-2 text-white hover:bg-primary-700 transition-colors cursor-pointer"
        aria-label="Ouvrir le menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}

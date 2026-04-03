import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import { sidebarItems } from "./sidebarConfig";
import HeaderDetails, { type HeaderDetailsProps } from "./HeaderDetails";

type DetailsLayoutProps = {
  header?: HeaderDetailsProps | null;
  children: ReactNode;
};

export default function DetailsLayout({ header, children }: DetailsLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = <span className="text-xl font-bold text-white">Logo</span>;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <MobileHeader logo={logo} onOpenMenu={() => setMenuOpen(true)} />

      <Sidebar
        items={sidebarItems}
        logo={logo}
        onLogout={() => alert("Déconnexion")}
        mobileOpen={menuOpen}
        onCloseMobile={() => setMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {header && (
          <HeaderDetails
            title={header.title}
            buttonPrimary={header.buttonPrimary}
            buttonSecondary={header.buttonSecondary}
            buttonTertiary={header.buttonTertiary}
          />
        )}

        <main className="flex-1 overflow-auto bg-bg-primary flex flex-col gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}

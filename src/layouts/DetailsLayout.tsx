import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { sidebarItems } from "./sidebarConfig";
import HeaderDetails, { type HeaderDetailsProps } from "./HeaderDetails";

type DetailsLayoutProps = {
  header?: HeaderDetailsProps | null;
  children: ReactNode;
};

export default function DetailsLayout({ header, children }: DetailsLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar
        items={sidebarItems}
        logo={
          <span className="text-xl font-bold text-white">Logo</span>
        }
        name="Paul Vigneron"
        email="paul.vigneron@gmail.com"
        onLogout={() => alert("Déconnexion")}
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

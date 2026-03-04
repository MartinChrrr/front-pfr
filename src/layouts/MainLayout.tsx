import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { sidebarItems } from "./sidebarConfig";

export default function MainLayout({ children }: { children: ReactNode }) {
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

      <main className="flex-1 overflow-auto bg-bg-primary p-10 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
}

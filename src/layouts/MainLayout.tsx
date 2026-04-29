import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import { sidebarItems } from "./sidebarConfig";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const logo = <span className="text-xl font-bold text-white">DMT</span>;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <MobileHeader logo={logo} onOpenMenu={() => setMenuOpen(true)} />

      <Sidebar
        items={sidebarItems}
        logo={logo}
        onLogout={handleLogout}
        mobileOpen={menuOpen}
        onCloseMobile={() => setMenuOpen(false)}
      />

      <main className="flex-1 overflow-auto bg-bg-primary p-4 md:p-10 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
}

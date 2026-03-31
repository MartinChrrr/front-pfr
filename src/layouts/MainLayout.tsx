import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { sidebarItems } from "./sidebarConfig";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        items={sidebarItems}
        logo={
          <span className="text-xl font-bold text-white">Logo</span>
        }
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-auto bg-bg-primary p-10 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
}

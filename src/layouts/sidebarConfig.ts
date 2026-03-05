import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  CircleUserRound,
  Settings,
} from "lucide-react";
import type { SidebarEntry } from "./Sidebar";

export const sidebarItems: SidebarEntry[] = [
  { type: "item", label: "Dashboard", icon: LayoutDashboard, to: "/" },
  {
    type: "group",
    label: "Devis Et Factures",
    icon: FileText,
    subItems: [
      { label: "Devis", to: "/devis" },
      { label: "Factures", to: "/factures" },
    ],
  },
  { type: "item", label: "Clients", icon: Users, to: "/clients" },
  // { type: "item", label: "Calendrier", icon: Calendar, to: "/calendrier" },
  // { type: "item", label: "Comptes", icon: CircleUserRound, to: "/comptes" },
  { type: "item", label: "Settings", icon: Settings, to: "/settings" },
];

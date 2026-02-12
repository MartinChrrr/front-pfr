import './App.css'
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  CircleUserRound,
  Settings,
} from 'lucide-react'
import Sidebar from './components/ui/Sidebar'
import type { SidebarEntry } from './components/ui/Sidebar'
import DevisTable, { type DevisRow } from './components/ui/DevisTable'

const sidebarItems: SidebarEntry[] = [
  { type: "item", label: "Dashboard", icon: LayoutDashboard, to: "/" },
  {
    type: "group",
    label: "Devis Et Factures",
    icon: FileText,
    subItems: [
      { label: "Devis" },
      { label: "Factures" },
    ],
  },
  { type: "item", label: "Clients", icon: Users, to: "/clients" },
  { type: "item", label: "Calendrier", icon: Calendar, to: "/calendrier" },
  { type: "item", label: "Comptes", icon: CircleUserRound, to: "/comptes" },
  { type: "item", label: "Settings", icon: Settings, to: "/settings" },
];

const sampleRows: DevisRow[] = [
  { id: 1, number: "DEV-001", date: "12/01/2025", client: "Entreprise ABC", echeance: "12/02/2025", status: "ENVOYE", ttc: 1250.00 },
  { id: 2, number: "DEV-002", date: "15/01/2025", client: "Studio Graphique Martin", echeance: "15/02/2025", status: "ACCEPTE", ttc: 3400.50 },
  { id: 3, number: "DEV-003", date: "20/01/2025", client: "SARL Dupont & Fils", echeance: "20/02/2025", status: "BROUILLON", ttc: 780.00 },
  { id: 4, number: "DEV-004", date: "25/01/2025", client: "Tech Solutions SAS", echeance: "25/02/2025", status: "REFUSE", ttc: 5200.00 },
  { id: 5, number: "DEV-005", date: "01/02/2025", client: "Boulangerie du Coin", echeance: "01/03/2025", status: "EXPIRE", ttc: 620.00 },
  { id: 6, number: "DEV-006", date: "05/02/2025", client: "Agence Web Créative", echeance: "05/03/2025", status: "ENVOYE", ttc: 8900.00 },
];

function App() {
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

      <main className="flex-1 overflow-auto bg-bg-primary p-10">
        <h1 className="text-2xl font-bold text-text-black mb-6">Devis</h1>
        <DevisTable rows={sampleRows} onMore={(id) => alert(`Action sur devis #${id}`)} />
      </main>
    </div>
  )
}

export default App

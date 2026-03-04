import { SquarePen, Trash2 } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ClientsTable, { type ClientRow } from "../components/ui/table/ClientsTable";

const sampleRows: ClientRow[] = [
  { id: 1, company_name: "Entreprise ABC", contact_name: "Jean Dupont", email: "jean.dupont@abc.fr", phone: "01 23 45 67 89" },
  { id: 2, company_name: "Studio Graphique Martin", contact_name: "Sophie Martin", email: "sophie@studio-martin.fr", phone: "06 12 34 56 78" },
  { id: 3, company_name: "SARL Dupont & Fils", contact_name: "Pierre Dupont", email: "p.dupont@dupontfils.fr", phone: "04 56 78 90 12" },
  { id: 4, company_name: "Tech Solutions SAS", contact_name: "Marie Leroy", email: "m.leroy@techsolutions.fr", phone: "07 89 01 23 45" },
  { id: 5, company_name: "Boulangerie du Coin", contact_name: "Paul Bernard", email: "contact@boulangerie-coin.fr", phone: "03 45 67 89 01" },
  { id: 6, company_name: "Agence Web Créative", contact_name: "Lucie Moreau", email: "lucie@agence-creative.fr", phone: "06 78 90 12 34" },
];

export default function Clients() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Clients</h1>
      <ClientsTable
        rows={sampleRows}
        menuItems={(id) => [
          { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => alert(`Modifier client #${id}`) },
          { label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => alert(`Supprimer client #${id}`) },
        ]}
      />
    </MainLayout>
  );
}

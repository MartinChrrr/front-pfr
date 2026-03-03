import MainLayout from "../layouts/MainLayout";
import DevisTable, { type DevisRow } from "../components/ui/DevisTable";

const sampleRows: DevisRow[] = [
  { id: 1, number: "DEV-001", date: "12/01/2025", client: "Entreprise ABC", echeance: "12/02/2025", status: "ENVOYE", ttc: 1250.0 },
  { id: 2, number: "DEV-002", date: "15/01/2025", client: "Studio Graphique Martin", echeance: "15/02/2025", status: "ACCEPTE", ttc: 3400.5 },
  { id: 3, number: "DEV-003", date: "20/01/2025", client: "SARL Dupont & Fils", echeance: "20/02/2025", status: "BROUILLON", ttc: 780.0 },
  { id: 4, number: "DEV-004", date: "25/01/2025", client: "Tech Solutions SAS", echeance: "25/02/2025", status: "REFUSE", ttc: 5200.0 },
  { id: 5, number: "DEV-005", date: "01/02/2025", client: "Boulangerie du Coin", echeance: "01/03/2025", status: "EXPIRE", ttc: 620.0 },
  { id: 6, number: "DEV-006", date: "05/02/2025", client: "Agence Web Créative", echeance: "05/03/2025", status: "ENVOYE", ttc: 8900.0 },
];

export default function Quotes() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Devis</h1>
      <DevisTable rows={sampleRows} onMore={(id) => alert(`Action sur devis #${id}`)} />
    </MainLayout>
  );
}

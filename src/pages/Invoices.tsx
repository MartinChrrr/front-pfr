import MainLayout from "../layouts/MainLayout";
import FacturesTable, { type FactureRow } from "../components/ui/table/FacturesTable";

const sampleRows: FactureRow[] = [
  { id: 1, number: "FAC-001", date: "15/01/2025", client: "Entreprise ABC", echeance: "15/02/2025", status: "ENVOYEE", ttc: 1250.0 },
  { id: 2, number: "FAC-002", date: "20/01/2025", client: "Studio Graphique Martin", echeance: "20/02/2025", status: "PAYEE", ttc: 3400.5 },
  { id: 3, number: "FAC-003", date: "25/01/2025", client: "SARL Dupont & Fils", echeance: "25/02/2025", status: "BROUILLON", ttc: 780.0 },
  { id: 4, number: "FAC-004", date: "01/02/2025", client: "Tech Solutions SAS", echeance: "01/03/2025", status: "EN_RETARD", ttc: 5200.0 },
  { id: 5, number: "FAC-005", date: "05/02/2025", client: "Boulangerie du Coin", echeance: "05/03/2025", status: "PAYEE", ttc: 620.0 },
  { id: 6, number: "FAC-006", date: "10/02/2025", client: "Agence Web Créative", echeance: "10/03/2025", status: "ENVOYEE", ttc: 8900.0 },
];

export default function Invoices() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Factures</h1>
      <FacturesTable rows={sampleRows} />
    </MainLayout>
  );
}

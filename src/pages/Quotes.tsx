import { SquareX, SquarePen, Trash2 } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import DevisTable from "../components/ui/table/DevisTable";
import { sampleDevisRows } from "../.temp/MockedData";

export default function Quotes() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Devis</h1>
      <DevisTable
        rows={sampleDevisRows}
        menuItems={(id) => [
          { label: "Non Valider", icon: <SquareX size={18} />, onClick: () => alert(`Non valider devis #${id}`) },
          { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => alert(`Modifier devis #${id}`) },
          { label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => alert(`Supprimer devis #${id}`) },
        ]}
      />
    </MainLayout>
  );
}

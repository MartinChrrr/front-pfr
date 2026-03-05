import { SquarePen, Trash2 } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ClientsTable from "../components/ui/table/ClientsTable";
import { sampleClientRows } from "../.temp/MockedData";

export default function Clients() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Clients</h1>
      <ClientsTable
        rows={sampleClientRows}
        menuItems={(id) => [
          { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => alert(`Modifier client #${id}`) },
          { label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => alert(`Supprimer client #${id}`) },
        ]}
      />
    </MainLayout>
  );
}

import MainLayout from "../layouts/MainLayout";
import FacturesTable from "../components/ui/table/FacturesTable";
import { sampleFactureRows } from "../.temp/MockedData";

export default function Invoices() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Factures</h1>
      <FacturesTable rows={sampleFactureRows} />
    </MainLayout>
  );
}

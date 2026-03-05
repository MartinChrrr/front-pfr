import { fakeDevis } from "../.temp/MockedData";
import QuotesDetailsCard from "../components/Quotes/QuotesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import { Mail, SquarePen, FileText } from "lucide-react";

export default function DevisDetails() {
  return (
    <DetailsLayout
      header={{
        title: "DEV-001",
        buttonPrimary: { title: "Transformer en facture", icon: FileText },
        buttonSecondary: { title: "Modifier", icon: SquarePen },
      }}
    >
      <div className="flex flex-row gap-5 py-20 px-10 w-full">
        <QuotesDetailsCard quote={fakeDevis[0]} className="w-2/3" />
      </div>
      
    </DetailsLayout>
  );
}

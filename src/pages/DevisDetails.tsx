import { useParams } from "react-router-dom";
import { fakeDevis } from "../.temp/MockedData";
import LittleClientsCard from "../components/Quotes/LittleClientsCard";
import QuotesDetailsCard from "../components/Quotes/QuotesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import { SquarePen, FileText } from "lucide-react";

export default function DevisDetails() {
  const { id } = useParams();
  const quote = fakeDevis.find((d) => d.id === Number(id));

  if (!quote) return <p>Devis introuvable</p>;

  return (
    <DetailsLayout
      header={{
        title: quote.numero,
        buttonPrimary: { title: "Transformer en facture", icon: FileText },
        buttonSecondary: { title: "Modifier", icon: SquarePen },
      }}
    >
      <div className="flex flex-row-reverse gap-5 py-20 px-10 w-full">
        <LittleClientsCard client={quote.client} className="w-1/3"/>
        <QuotesDetailsCard quote={quote} className="w-2/3" />
      </div>
      
    </DetailsLayout>
  );
}

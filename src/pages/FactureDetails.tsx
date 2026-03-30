import { useParams } from "react-router-dom";
import { fakeFactures } from "../.temp/MockedData";
import LittleClientsCard from "../components/Quotes/LittleClientsCard";
import InvoicesDetailsCard from "../components/Invoices/InvoicesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import { Mail, FileText } from "lucide-react";

export default function FactureDetails() {
  const { id } = useParams();
  const invoice = fakeFactures.find((f) => f.id === Number(id));

  if (!invoice) return <p>Facture introuvable</p>;

  return (
    <DetailsLayout
      header={{
        title: invoice.numero,
        buttonPrimary: { title: "Envoyer", icon: Mail },
        buttonSecondary: { title: "Télécharger", icon: FileText },
      }}
    >
      <div className="flex flex-row-reverse gap-5 py-20 px-10 w-full">
        <LittleClientsCard client={invoice.client} className="w-1/3" />
        <InvoicesDetailsCard invoice={invoice} className="w-2/3" />
      </div>
    </DetailsLayout>
  );
}

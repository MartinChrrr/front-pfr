import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsLayout from "../layouts/DetailsLayout";
import { SquarePen } from "lucide-react";
import ClientCard from "../components/Client/ClientCard";
import Card from "../components/ui/Card";
import BillingRowClientCard from "../components/Client/BillingRowClientCard";
import type { Client } from "../types/client";
import { fakeClient, fakeDevis, fakeFactures } from "../.temp/MockedData";


export default function ClientDetails() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (id) {
      setClient(fakeClient);
      
    }
  }, [id]);

  return (
    <DetailsLayout
      header={{
        title: client ? client.raison_sociale : "Client",
        buttonPrimary: { title: "Créer une facture", icon: SquarePen },
        buttonSecondary: { title: "Créer un devis", icon: SquarePen },
      }}
    >
      {!client ? (
        <p className="text-text-placeholder">Client introuvable.</p>
      ) : (
        //<ClientCard client={client} />
        <div className="flex flex-row gap-5 py-20 px-10 w-full">
          <ClientCard client={client} className="w-2/3"  />
          <div className="flex flex-col gap-5 w-1/3">
            <Card title="Factures" classNameHeader="text-center">
              {fakeFactures.map(facture => (
                <BillingRowClientCard 
                  key={facture.id} 
                  name={facture.numero} 
                  status={facture.statut} 
                  total={Number(facture.total_ttc)}
                  date= {new Date(facture.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  />))}
            </Card>
            <Card title="Devis" classNameHeader="text-center">
              {fakeDevis.map(devis => (
                <BillingRowClientCard 
                  key={devis.id} 
                  name={devis.numero} 
                  status={devis.statut} 
                  total={Number(devis.total_ttc)}
                  date= {new Date(devis.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  />))} 
            </Card>
          </div>

        </div>
      )}
    </DetailsLayout>
  );
}

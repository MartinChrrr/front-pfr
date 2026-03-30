import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsLayout from "../layouts/DetailsLayout";
import { SquarePen } from "lucide-react";
import ClientCard from "../components/Client/ClientCard";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import BillingRowClientCard from "../components/Client/BillingRowClientCard";
import EditClientForm from "../components/forms/EditClientForm";
import type { EditClientFormData } from "../components/forms/EditClientForm";
import type { Client } from "../types/client";
import { updateClient } from "../api/clients";
import { fakeClient, fakeDevis, fakeFactures } from "../.temp/MockedData";

const FORM_ID = "edit-client-form";

export default function ClientDetails() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setClient(fakeClient);
    }
  }, [id]);

  const handleEditSubmit = async (data: EditClientFormData) => {
    if (!client) return;

    const { ligne1, code_postal, ville, ...clientFields } = data;

    const updatedClient = await updateClient(client.id, {
      ...clientFields,
      adresses: [
        {
          type: "SIEGE",
          ligne1,
          code_postal,
          ville,
        },
      ],
    });

    setClient(updatedClient);
    setIsEditModalOpen(false);
  };

  const handleConfirm = () => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <DetailsLayout
      header={{
        title: client ? client.raison_sociale : "Client",
        buttonPrimary: { title: "Créer une facture", icon: SquarePen },
        buttonSecondary: { title: "Modifier", icon: SquarePen, onClick: () => setIsEditModalOpen(true) },
      }}
    >
      {!client ? (
        <p className="text-text-placeholder">Client introuvable.</p>
      ) : (
        <div className="flex flex-row gap-5 py-20 px-10 w-full">
          <ClientCard client={client} className="w-2/3" />
          <div className="flex flex-col gap-5 w-1/3">
            <Card title="Factures" classNameHeader="text-center">
              {fakeFactures.map(facture => (
                <BillingRowClientCard
                  key={facture.id}
                  name={facture.numero}
                  status={facture.statut}
                  total={Number(facture.total_ttc)}
                  date={new Date(facture.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                />
              ))}
            </Card>
            <Card title="Devis" classNameHeader="text-center">
              {fakeDevis.map(devis => (
                <BillingRowClientCard
                  key={devis.id}
                  name={devis.numero}
                  status={devis.statut}
                  total={Number(devis.total_ttc)}
                  date={new Date(devis.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                />
              ))}
            </Card>
          </div>
        </div>
      )}

      {client && (
        <Modal
          title="Modifier le client"
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={handleConfirm}
          confirmLabel="+ Enregistrer les modifications"
        >
          <EditClientForm
            client={client}
            formId={FORM_ID}
            onSubmit={handleEditSubmit}
          />
        </Modal>
      )}
    </DetailsLayout>
  );
}

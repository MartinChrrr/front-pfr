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
import { getClient, updateClient } from "../api/clients";
import { useQuotes } from "../hooks/useQuotes";
import { useInvoices } from "../hooks/useInvoices";
import EditInvoiceForm from "../components/forms/EditInvoiceForm";
import type { EditInvoiceFormData } from "../components/forms/EditInvoiceForm";
import { createInvoice } from "../api/invoices";
import { useClients } from "../hooks/useClients";

const FORM_ID = "edit-client-form";

export default function ClientDetails() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Controls the visibility of the create invoice modal
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState(false);
  // Fetches the list of clients for the form
  const { clients } = useClients();
  // Unique ID to link the confirm button to the form
  const INVOICE_FORM_ID = "create-invoice-form";

  // Sends the form data to the API then closes the modal
  const handleCreateInvoiceSubmit = async (data: EditInvoiceFormData) => {
    await createInvoice({
      client_id: Number(data.client_id),
      date_emission: data.date_emission,
      date_echeance: data.date_echeance,
      notes: data.notes,
      // Maps each line with its order index
      lignes: data.lignes.map((l, i) => ({
        ordre: i + 1,
        libelle: l.libelle,
        quantite: l.quantite,
        prix_unitaire_ht: l.prix_unitaire_ht,
        taux_tva: l.taux_tva,
      })),
    });
    setIsCreateInvoiceModalOpen(false);
  };

  // Triggers the form submission when the confirm button is clicked
  const handleCreateInvoiceConfirm = () => {
    const form = document.getElementById(INVOICE_FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  const { quotes } = useQuotes(client ? { client_id: client.id } : undefined);
  const { invoices } = useInvoices(client ? { client: client.id } : undefined);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setIsLoading(true);

    getClient(Number(id))
      .then((data) => {
        if (!cancelled) {
          setClient(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setClient(null);
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
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

  if (isLoading) {
    return (
      <DetailsLayout header={{ title: "Client", buttonPrimary: { title: "Créer une facture", icon: SquarePen } }}>
        <p className="text-text-placeholder py-10 text-center">Chargement...</p>
      </DetailsLayout>
    );
  }

  return (
    <DetailsLayout
      header={{
        title: client ? client.raison_sociale : "Client",
        // Connects the "Créer une facture" button to open the modal
        buttonPrimary: { title: "Créer une facture", icon: SquarePen, onClick: () => setIsCreateInvoiceModalOpen(true)},
        buttonSecondary: { title: "Modifier", icon: SquarePen, onClick: () => setIsEditModalOpen(true) },
      }}
    >
      {!client ? (
        <p className="text-text-placeholder py-10 text-center">Client introuvable.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-5 py-10 md:py-20 px-4 md:px-10 w-full">
          <ClientCard client={client} className="w-full md:w-2/3" />
          <div className="flex flex-col gap-5 w-full md:w-1/3">
            <Card title="Factures" classNameHeader="text-center">
              {invoices.map(facture => (
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
              {quotes.map(devis => (
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

      {/* Only renders the modal if a client is loaded */}
      {client && (
        <Modal
          title="Créer une facture"
          isOpen={isCreateInvoiceModalOpen}
          onClose={() => setIsCreateInvoiceModalOpen(false)}
          onConfirm={handleCreateInvoiceConfirm}
          confirmLabel="+ Créer la facture"
        >
      <EditInvoiceForm
        formId={INVOICE_FORM_ID}
        clients={clients}
        defaultValues={{ 
          // Pre-selects the current client
          client_id: String(client.id),
          // Sets today's date as emission date
          date_emission: new Date().toISOString().slice(0, 10),
          // Empty fields with their default values
          date_echeance: "",
          notes: "",
          // Adds the default empty prestation line
          lignes: [{ libelle: "", quantite: "1", prix_unitaire_ht: "", taux_tva: "20" }]
        }}
        onSubmit={handleCreateInvoiceSubmit}
      />
        </Modal>
      )}
    </DetailsLayout>
  );
}

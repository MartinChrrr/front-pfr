import { useState } from "react";
import { useParams } from "react-router-dom";
import { fakeDevis, fakeClient } from "../.temp/MockedData";
import LittleClientsCard from "../components/Quotes/LittleClientsCard";
import QuotesDetailsCard from "../components/Quotes/QuotesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import Modal from "../components/ui/Modal";
import EditQuoteForm from "../components/forms/EditQuoteForm";
import type { EditQuoteFormData } from "../components/forms/EditQuoteForm";
import { updateQuote } from "../api/quotes";
import { SquarePen, FileText } from "lucide-react";

const FORM_ID = "edit-quote-form";

export default function DevisDetails() {
  const { id } = useParams();
  const [quote, setQuote] = useState(() => fakeDevis.find((d) => d.id === Number(id)));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!quote) return <p>Devis introuvable</p>;

  const handleEditSubmit = async (data: EditQuoteFormData) => {
    const updated = await updateQuote(quote.id, {
      client_id: Number(data.client_id),
      date_emission: data.date_emission,
      date_validite: data.date_validite,
      notes: data.notes,
      lignes: data.lignes.map((l, i) => ({
        ordre: i + 1,
        libelle: l.libelle,
        quantite: l.quantite,
        prix_unitaire_ht: l.prix_unitaire_ht,
        taux_tva: l.taux_tva,
      })),
    });

    setQuote(updated);
    setIsEditModalOpen(false);
  };

  const handleConfirm = () => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <DetailsLayout
      header={{
        title: quote.numero,
        buttonPrimary: { title: "Transformer en facture", icon: FileText },
        buttonSecondary: { title: "Modifier", icon: SquarePen, onClick: () => setIsEditModalOpen(true) },
      }}
    >
      <div className="flex flex-row-reverse gap-5 py-20 px-10 w-full">
        <LittleClientsCard client={quote.client} className="w-1/3" />
        <QuotesDetailsCard quote={quote} className="w-2/3" />
      </div>

      <Modal
        title="Modifier le devis"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel="+ Enregistrer les modifications"
      >
        <EditQuoteForm
          formId={FORM_ID}
          clients={[fakeClient]}
          defaultValues={{
            client_id: String(quote.client.id),
            date_emission: quote.date_emission,
            date_validite: quote.date_validite,
            notes: quote.notes,
            lignes: quote.lignes.map((l) => ({
              libelle: l.libelle,
              quantite: l.quantite,
              prix_unitaire_ht: l.prix_unitaire_ht,
              taux_tva: l.taux_tva,
            })),
          }}
          onSubmit={handleEditSubmit}
        />
      </Modal>
    </DetailsLayout>
  );
}

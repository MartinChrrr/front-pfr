import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LittleClientsCard from "../components/Quotes/LittleClientsCard";
import QuotesDetailsCard from "../components/Quotes/QuotesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import Modal from "../components/ui/Modal";
import EditQuoteForm from "../components/forms/EditQuoteForm";
import type { EditQuoteFormData } from "../components/forms/EditQuoteForm";
import { getQuote, updateQuote, changeQuoteStatus } from "../api/quotes";
import { createInvoiceFromQuote } from "../api/invoices";
import { useClients } from "../hooks/useClients";
import ChangeQuoteStatusForm from "../components/forms/ChangeQuoteStatusForm";
import type { Quote, QuoteStatus } from "../types/quote";
import { SquarePen, FileText, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FORM_ID = "edit-quote-form";
const STATUS_FORM_ID = "change-quote-status-form";

export default function DevisDetails() {
  const { id } = useParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { clients } = useClients();
  const navigate = useNavigate();

  const handleTransformToInvoice = async () => {
    if (!quote) return;
    const invoice = await createInvoiceFromQuote(quote.id);
    navigate(`/factures/${invoice.id}`);
  };

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setIsLoading(true);

    getQuote(Number(id))
      .then((data) => {
        if (!cancelled) {
          setQuote(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setQuote(null);
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  if (isLoading) {
    return (
      <DetailsLayout header={{ title: "Devis", buttonPrimary: { title: "Transformer en facture", icon: FileText } }}>
        <p className="text-text-placeholder py-10 text-center">Chargement...</p>
      </DetailsLayout>
    );
  }

  if (!quote) return <p className="text-text-placeholder py-10 text-center">Devis introuvable</p>;

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

  const handleStatusSubmit = async (statut: QuoteStatus) => {
    const updated = await changeQuoteStatus(quote.id, statut);
    setQuote(updated);
    setIsStatusModalOpen(false);
  };

  const handleStatusConfirm = () => {
    const form = document.getElementById(STATUS_FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <DetailsLayout
      header={{
        title: quote.numero,
        buttonPrimary: { title: "Transformer en facture", icon: FileText, onClick: handleTransformToInvoice },
        buttonSecondary: { title: "Modifier", icon: SquarePen, onClick: () => setIsEditModalOpen(true) },
        buttonTertiary: { title: "Changer le statut", icon: RefreshCw, onClick: () => setIsStatusModalOpen(true) },
      }}
    >
      <div className="flex flex-col-reverse md:flex-row-reverse gap-5 py-10 md:py-20 px-4 md:px-10 w-full">
        <LittleClientsCard client={quote.client} className="w-full md:w-1/3" />
        <QuotesDetailsCard quote={quote} className="w-full md:w-2/3" />
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
          clients={clients}
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

      <Modal
        title="Changer le statut"
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleStatusConfirm}
        confirmLabel="Confirmer"
      >
        <ChangeQuoteStatusForm
          formId={STATUS_FORM_ID}
          currentStatus={quote.statut}
          onSubmit={handleStatusSubmit}
        />
      </Modal>
    </DetailsLayout>
  );
}

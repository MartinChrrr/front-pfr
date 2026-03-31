import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LittleClientsCard from "../components/Quotes/LittleClientsCard";
import InvoicesDetailsCard from "../components/Invoices/InvoicesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import { getInvoice, downloadInvoicePdf, changeInvoiceStatus } from "../api/invoices";
import ChangeInvoiceStatusForm from "../components/forms/ChangeInvoiceStatusForm";
import type { Invoice, InvoiceStatus } from "../types/invoice";
import Modal from "../components/ui/Modal";
import { Download, RefreshCw } from "lucide-react";

export default function FactureDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const STATUS_FORM_ID = "change-invoice-status-form";

  const handleStatusSubmit = async (statut: InvoiceStatus) => {
    if (!invoice) return;
    const updated = await changeInvoiceStatus(invoice.id, statut);
    setInvoice(updated);
    setIsStatusModalOpen(false);
  };

  const handleStatusConfirm = () => {
    const form = document.getElementById(STATUS_FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setIsLoading(true);

    getInvoice(Number(id))
      .then((data) => {
        if (!cancelled) {
          setInvoice(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInvoice(null);
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [id]);

  if (isLoading) {
    return (
      <DetailsLayout header={{ title: "Facture", buttonPrimary: { title: "Télécharger PDF", icon: Download } }}>
        <p className="text-text-placeholder py-10 text-center">Chargement...</p>
      </DetailsLayout>
    );
  }

  if (!invoice) return <p className="text-text-placeholder py-10 text-center">Facture introuvable</p>;

  return (
    <DetailsLayout
      header={{
        title: invoice.numero,
        buttonPrimary: { title: "Envoyer", icon: Download, onClick: () => downloadInvoicePdf(invoice.id) },
        buttonSecondary: { title: "Télécharger PDF", icon: Download, onClick: () => downloadInvoicePdf(invoice.id) },
        buttonTertiary: invoice.statut !== "PAYEE" ? { title: "Changer le statut", icon: RefreshCw, onClick: () => setIsStatusModalOpen(true) } : undefined,
      }}
    >
      <div className="flex flex-row-reverse gap-5 py-20 px-10 w-full">
        <LittleClientsCard client={invoice.client} className="w-1/3" />
        <InvoicesDetailsCard invoice={invoice} className="w-2/3" />
      </div>

      {invoice.statut !== "PAYEE" && (
        <Modal
          title="Changer le statut"
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          onConfirm={handleStatusConfirm}
          confirmLabel="Confirmer"
        >
          <ChangeInvoiceStatusForm
            formId={STATUS_FORM_ID}
            currentStatus={invoice.statut}
            onSubmit={handleStatusSubmit}
          />
        </Modal>
      )}
    </DetailsLayout>
  );
}

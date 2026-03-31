import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LittleClientsCard from "../components/Quotes/LittleClientsCard";
import InvoicesDetailsCard from "../components/Invoices/InvoicesDetailsCard";
import DetailsLayout from "../layouts/DetailsLayout";
import { getInvoice, downloadInvoicePdf } from "../api/invoices";
import type { Invoice } from "../types/invoice";
import { Download } from "lucide-react";

export default function FactureDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      }}
    >
      <div className="flex flex-row-reverse gap-5 py-20 px-10 w-full">
        <LittleClientsCard client={invoice.client} className="w-1/3" />
        <InvoicesDetailsCard invoice={invoice} className="w-2/3" />
      </div>
    </DetailsLayout>
  );
}

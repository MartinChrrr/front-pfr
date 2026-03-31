import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, SquarePen, Trash2, Download, Plus } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import FacturesTable from "../components/ui/table/FacturesTable";
import SearchBar from "../components/ui/SearchBar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EditInvoiceForm from "../components/forms/EditInvoiceForm";
import type { EditInvoiceFormData } from "../components/forms/EditInvoiceForm";
import ChangeInvoiceStatusForm from "../components/forms/ChangeInvoiceStatusForm";
import { createInvoice, deleteInvoice, changeInvoiceStatus, downloadInvoicePdf } from "../api/invoices";
import { useInvoices } from "../hooks/useInvoices";
import { useClients } from "../hooks/useClients";
import type { InvoiceStatus } from "../types/invoice";

const FORM_ID = "create-invoice-form";
const STATUS_FORM_ID = "change-invoice-status-form";

export default function Invoices() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<{ id: number; status: InvoiceStatus } | null>(null);
  const { invoiceRows, isLoading, error, refresh } = useInvoices({});
  const { clients } = useClients();

  const filteredRows = invoiceRows.filter((row) =>
    [row.number, row.client]
      .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateSubmit = async (data: EditInvoiceFormData) => {
    await createInvoice({
      client_id: Number(data.client_id),
      date_emission: data.date_emission,
      date_echeance: data.date_echeance,
      notes: data.notes,
      lignes: data.lignes.map((l, i) => ({
        ordre: i + 1,
        libelle: l.libelle,
        quantite: l.quantite,
        prix_unitaire_ht: l.prix_unitaire_ht,
        taux_tva: l.taux_tva,
      })),
    });

    refresh();
    setIsCreateModalOpen(false);
  };

  const handleConfirm = () => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  const handleDelete = async (id: number) => {
    await deleteInvoice(id);
    refresh();
  };

  const handleStatusSubmit = async (statut: InvoiceStatus) => {
    if (!selectedInvoice) return;
    await changeInvoiceStatus(selectedInvoice.id, statut);
    refresh();
    setIsStatusModalOpen(false);
  };

  const handleStatusConfirm = () => {
    const form = document.getElementById(STATUS_FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-black">Factures</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Nouveau
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher une facture"
      />

      {isLoading ? (
        <p className="text-text-placeholder py-10 text-center">Chargement...</p>
      ) : error ? (
        <p className="text-alert py-10 text-center">{error}</p>
      ) : (
        <FacturesTable
          rows={filteredRows}
          menuItems={(row) => {
            const items = [
              { label: "Visualiser", icon: <Eye size={18} />, onClick: () => navigate(`/factures/${row.id}`) },
              { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => { setSelectedInvoice({ id: row.id, status: row.status }); setIsStatusModalOpen(true); } },
            ];
            if (row.status === "BROUILLON") {
              items.push({ label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => handleDelete(row.id) });
            }
            items.push({ label: "Télécharger", icon: <Download size={18} />, onClick: () => downloadInvoicePdf(row.id) });
            return items;
          }}
        />
      )}

      <Modal
        title="Créer une facture"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel="+ Créer la facture"
      >
        <EditInvoiceForm
          formId={FORM_ID}
          clients={clients}
          onSubmit={handleCreateSubmit}
        />
      </Modal>

      <Modal
        title="Modifier le statut de la facture"
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleStatusConfirm}
        confirmLabel="Confirmer"
      >
        {selectedInvoice && (
          <ChangeInvoiceStatusForm
            formId={STATUS_FORM_ID}
            currentStatus={selectedInvoice.status}
            onSubmit={handleStatusSubmit}
          />
        )}
      </Modal>
    </MainLayout>
  );
}

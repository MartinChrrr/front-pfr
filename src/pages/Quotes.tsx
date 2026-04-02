import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, SquarePen, Trash2, Download, Plus } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import DevisTable from "../components/ui/table/DevisTable";
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

import EditQuoteForm from "../components/forms/EditQuoteForm";
import type { EditQuoteFormData } from "../components/forms/EditQuoteForm";
import ChangeQuoteStatusForm from "../components/forms/ChangeQuoteStatusForm";
import { createQuote, deleteQuote, changeQuoteStatus, downloadQuotePdf } from "../api/quotes";
import { useQuotes } from "../hooks/useQuotes";
import { useClients } from "../hooks/useClients";
import type { QuoteStatus } from "../types/quote";

const FORM_ID = "create-quote-form";
const STATUS_FORM_ID = "change-quote-status-form";

const PAGE_SIZE = 20;

export default function Quotes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<{ id: number; status: QuoteStatus } | null>(null);
  const debouncedSearch = useDebouncedValue(search);
  const { quoteRows, count, isLoading, error, refresh } = useQuotes({ search: debouncedSearch || undefined, page });
  const { clients } = useClients();

  const totalPages = Math.ceil(count / PAGE_SIZE);

  useEffect(() => { setPage(1); }, [debouncedSearch]);

  const handleCreateSubmit = async (data: EditQuoteFormData) => {
    await createQuote({
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

    refresh();
    setIsCreateModalOpen(false);
  };

  const handleConfirm = () => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  const handleDelete = async (id: number) => {
    await deleteQuote(id);
    refresh();
  };

  const handleStatusSubmit = async (statut: QuoteStatus) => {
    if (!selectedQuote) return;
    await changeQuoteStatus(selectedQuote.id, statut);
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
        <h1 className="text-2xl font-bold text-text-black">Devis</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Nouveau
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un devis"
      />

      {isLoading ? (
        <p className="text-text-placeholder py-10 text-center">Chargement...</p>
      ) : error ? (
        <p className="text-alert py-10 text-center">{error}</p>
      ) : (
        <>
          <DevisTable
            rows={quoteRows}
            menuItems={(row) => {
              const items = [
                { label: "Visualiser", icon: <Eye size={18} />, onClick: () => navigate(`/devis/${row.id}`) },
                { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => { setSelectedQuote({ id: row.id, status: row.status }); setIsStatusModalOpen(true); } },
              ];
              if (row.status !== "ACCEPTE") {
                items.push({ label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => handleDelete(row.id) });
              }
              items.push({ label: "Télécharger", icon: <Download size={18} />, onClick: () => downloadQuotePdf(row.id) });
              return items;
            }}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <Modal
        title="Créer un devis"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel="+ Créer le devis"
      >
        <EditQuoteForm
          formId={FORM_ID}
          clients={clients}
          onSubmit={handleCreateSubmit}
        />
      </Modal>

      <Modal
        title="Modifier le statut du devis"
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleStatusConfirm}
        confirmLabel="Confirmer"
      >
        {selectedQuote && (
          <ChangeQuoteStatusForm
            formId={STATUS_FORM_ID}
            currentStatus={selectedQuote.status}
            onSubmit={handleStatusSubmit}
          />
        )}
      </Modal>
    </MainLayout>
  );
}

import { useState, useEffect } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ClientsTable from "../components/ui/table/ClientsTable";
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import EditClientForm from "../components/forms/EditClientForm";
import type { EditClientFormData } from "../components/forms/EditClientForm";
import { createClient } from "../api/clients";
import { useClients } from "../hooks/useClients";

const FORM_ID = "create-client-form";

const emptyClient = {
  id: 0,
  raison_sociale: "",
  siret: "",
  email: "",
  telephone: "",
  contact_nom: "",
  contact_email: "",
  contact_telephone: "",
  notes: "",
  adresses: [],
  created_at: "",
  updated_at: "",
};

const PAGE_SIZE = 20;

export default function Clients() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const debouncedSearch = useDebouncedValue(search);
  const { clientRows, count, isLoading, error, refresh } = useClients({ search: debouncedSearch || undefined, page });

  const totalPages = Math.ceil(count / PAGE_SIZE);

  useEffect(() => { setPage(1); }, [debouncedSearch]);

  const handleCreateSubmit = async (data: EditClientFormData) => {
    const { ligne1, code_postal, ville, ...clientFields } = data;

    try {
      await createClient({
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

      refresh();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Erreur création client:", err);
    }
  };

  const handleConfirm = () => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-black">Clients</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} />
          Nouveau
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un client"
      />

      {isLoading ? (
        <p className="text-text-placeholder py-10 text-center">Chargement...</p>
      ) : error ? (
        <p className="text-alert py-10 text-center">{error}</p>
      ) : (
        <>
          <ClientsTable
            rows={clientRows}
            menuItems={(id) => [
              { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => alert(`Modifier client #${id}`) },
              { label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => alert(`Supprimer client #${id}`) },
            ]}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <Modal
        title="Créer un client"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel="+ Créer le client"
      >
        <EditClientForm
          client={emptyClient}
          formId={FORM_ID}
          onSubmit={handleCreateSubmit}
        />
      </Modal>
    </MainLayout>
  );
}

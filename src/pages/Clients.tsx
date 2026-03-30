import { useState } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ClientsTable from "../components/ui/table/ClientsTable";
import SearchBar from "../components/ui/SearchBar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EditClientForm from "../components/forms/EditClientForm";
import type { EditClientFormData } from "../components/forms/EditClientForm";
import { createClient } from "../api/clients";
import { sampleClientRows } from "../.temp/MockedData";

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

export default function Clients() {
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredRows = sampleClientRows.filter((row) =>
    [row.company_name, row.contact_name, row.email]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateSubmit = async (data: EditClientFormData) => {
    const { ligne1, code_postal, ville, ...clientFields } = data;

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

    setIsCreateModalOpen(false);
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

      <ClientsTable
        rows={filteredRows}
        menuItems={(id) => [
          { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => alert(`Modifier client #${id}`) },
          { label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => alert(`Supprimer client #${id}`) },
        ]}
      />

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

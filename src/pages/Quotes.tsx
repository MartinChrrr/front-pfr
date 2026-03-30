import { useState } from "react";
import { SquareX, SquarePen, Trash2, Plus } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import DevisTable from "../components/ui/table/DevisTable";
import SearchBar from "../components/ui/SearchBar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EditQuoteForm from "../components/forms/EditQuoteForm";
import type { EditQuoteFormData } from "../components/forms/EditQuoteForm";
import { createQuote } from "../api/quotes";
import { sampleDevisRows, fakeClient } from "../.temp/MockedData";

const FORM_ID = "create-quote-form";

export default function Quotes() {
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredRows = sampleDevisRows.filter((row) =>
    [row.number, row.client]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

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

    setIsCreateModalOpen(false);
  };

  const handleConfirm = () => {
    const form = document.getElementById(FORM_ID) as HTMLFormElement | null;
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

      <DevisTable
        rows={filteredRows}
        menuItems={(id) => [
          { label: "Non Valider", icon: <SquareX size={18} />, onClick: () => alert(`Non valider devis #${id}`) },
          { label: "Modifier", icon: <SquarePen size={18} />, onClick: () => alert(`Modifier devis #${id}`) },
          { label: "Supprimer", icon: <Trash2 size={18} />, onClick: () => alert(`Supprimer devis #${id}`) },
        ]}
      />

      <Modal
        title="Créer un devis"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel="+ Créer le devis"
      >
        <EditQuoteForm
          formId={FORM_ID}
          clients={[fakeClient]}
          onSubmit={handleCreateSubmit}
        />
      </Modal>
    </MainLayout>
  );
}

import DetailsLayout from "../layouts/DetailsLayout";
import { SquarePen } from "lucide-react";

export default function ClientDetails() {
  return (
    <DetailsLayout
      header={{
        title: "Client",
        buttonPrimary: { title: "Créer une facture", icon: SquarePen },
        buttonSecondary: { title: "Créer un devis", icon: SquarePen },
      }}
    >
      <p className="text-text-placeholder">Détails du client.</p>
    </DetailsLayout>
  );
}

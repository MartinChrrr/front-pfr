import DetailsLayout from "../layouts/DetailsLayout";
import { Mail, FileText } from "lucide-react";

export default function FactureDetails() {
  return (
    <DetailsLayout
      header={{
        title: "FAC-001",
        buttonPrimary: { title: "Envoyer", icon: Mail },
        buttonSecondary: { title: "Télécharger", icon: FileText },
      }}
    >
      <p className="text-text-placeholder">Détails de la facture.</p>
    </DetailsLayout>
  );
}

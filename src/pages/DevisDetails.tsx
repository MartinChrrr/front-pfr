import DetailsLayout from "../layouts/DetailsLayout";
import { Mail, SquarePen, FileText } from "lucide-react";

export default function DevisDetails() {
  return (
    <DetailsLayout
      header={{
        title: "DEV-001",
        buttonPrimary: { title: "Transformer en facture", icon: FileText },
        buttonSecondary: { title: "Modifier", icon: SquarePen },
      }}
    >
      <p className="text-text-placeholder">Détails du devis.</p>
    </DetailsLayout>
  );
}

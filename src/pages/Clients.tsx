import MainLayout from "../layouts/MainLayout";
import HeaderDetails from "../layouts/HeaderDetails";
import { SquarePen, Mail } from "lucide-react";

export default function Clients() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Clients</h1>
      <p className="text-text-placeholder">Liste des clients.</p>
      <HeaderDetails title="FAC-2025" buttonPrimary={{title: "Transformer en facture", icon: Mail}} buttonSecondary={{title: "Modifier", icon: SquarePen}}/>
    </MainLayout>
  );
}

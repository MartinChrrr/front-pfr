import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Dashboard</h1>
      <p className="text-text-placeholder">Bienvenue sur le tableau de bord.</p>
      <Card title="Statistiques récentes" borderHeader={true}>
        <p>Voici un aperçu de vos statistiques récentes.</p>
      </Card>
    </MainLayout>
  );
}

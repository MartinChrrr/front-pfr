import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/Dashboard/StatCard";
import MonthlyRevenueChart from "../components/Dashboard/MonthlyRevenueChart";
import UpcomingDeadlinesCard from "../components/Dashboard/UpcomingDeadlinesCard";
import LastTransactionsCard from "../components/Dashboard/LastTransactionsCard";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
  const { monthlyRevenue, monthlyProfit, pendingTotal, upcomingDeadlines, lastTransactions } = useDashboardData();

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Dashboard</h1>

      <div className="flex gap-5">
        <StatCard title="Bénéfice mois" value={monthlyProfit} />
        <StatCard title="Entrée mois" value={monthlyProfit} />
        <StatCard title="Entrées en attente" value={pendingTotal} />
      </div>

      <MonthlyRevenueChart data={monthlyRevenue} />

      <div className="flex gap-5">
        <UpcomingDeadlinesCard deadlines={upcomingDeadlines} />
        <LastTransactionsCard transactions={lastTransactions} />
      </div>
    </MainLayout>
  );
}

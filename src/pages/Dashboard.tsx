import { useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import { useInvoices } from "../hooks/useInvoices";
import { useQuotes } from "../hooks/useQuotes";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

export default function Dashboard() {
  // Fetches all invoices and quotes
  const { invoices } = useInvoices({});
  const { quotes } = useQuotes({});

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Calculates total revenue per month for paid invoices only
  const monthlyRevenue = useMemo(() => {
    return MONTHS.map((month, index) => {
      const total = invoices
        .filter((inv) => {
          const date = new Date(inv.date_emission);
          return inv.statut === "PAYEE" && date.getFullYear() === currentYear && date.getMonth() === index;
        })
        .reduce((sum, inv) => sum + Number(inv.total_ttc), 0);
      return { month, total };
    });
  }, [invoices, currentYear]);

  // Calculates total profit for the current month (paid invoices)
  const monthlyProfit = useMemo(() => {
    return invoices
      .filter((inv) => {
        const date = new Date(inv.date_emission);
        return inv.statut === "PAYEE" && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
      })
      .reduce((sum, inv) => sum + Number(inv.total_ttc), 0);
  }, [invoices, currentYear, currentMonth]);

  // Calculates pending entries : accepted quotes + unpaid/overdue invoices
  const pendingTotal = useMemo(() => {
    const acceptedQuotes = quotes
      .filter((q) => q.statut === "ACCEPTE")
      .reduce((sum, q) => sum + Number(q.total_ttc), 0);
    const unpaidInvoices = invoices
      .filter((inv) => inv.statut === "ENVOYEE" || inv.statut === "EN_RETARD")
      .reduce((sum, inv) => sum + Number(inv.total_ttc), 0);
    return acceptedQuotes + unpaidInvoices;
  }, [invoices, quotes]);

  // Builds and sorts upcoming deadlines from invoices and quotes
  const upcomingDeadlines = useMemo(() => {
    const invoiceDeadlines = invoices
      .filter((inv) => inv.statut === "ENVOYEE" || inv.statut === "EN_RETARD")
      .map((inv) => ({
        id: inv.id,
        numero: inv.numero,
        client: inv.client.raison_sociale,
        date: inv.date_echeance,
        statut: inv.statut,
        type: "facture" as const,
      }));

    const quoteDeadlines = quotes
      .filter((q) => q.statut === "ENVOYE")
      .map((q) => ({
        id: q.id,
        numero: q.numero,
        client: q.client.raison_sociale,
        date: q.date_validite,
        statut: q.statut,
        type: "devis" as const,
      }));

    // Sorts by date ascending (soonest first)
    return [...invoiceDeadlines, ...quoteDeadlines].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [invoices, quotes]);

  // Gets the 10 most recent paid invoices as transactions
  const lastTransactions = useMemo(() => {
    return invoices
      .filter((inv) => inv.statut === "PAYEE")
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 10);
  }, [invoices]);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold text-text-black">Dashboard</h1>

      {/* Stats cards */}
      <div className="flex gap-5">
        <Card title="Bénéfice mois" className="flex-1">
          <p className="text-2xl font-bold">{monthlyProfit.toFixed(2)}€</p>
        </Card>
        <Card title="Entrée mois" className="flex-1">
          <p className="text-2xl font-bold">{monthlyProfit.toFixed(2)}€</p>
        </Card>
        <Card title="Entrées en attente" className="flex-1">
          <p className="text-2xl font-bold">{pendingTotal.toFixed(2)}€</p>
        </Card>
      </div>

      {/* Revenue chart */}
      <Card title="Revenus de l'année">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {/* Line color matches the app's primary color */}
            <Line type="monotone" dataKey="total" stroke="#1e3a5f" dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Deadlines and transactions */}
      <div className="flex gap-5">
        <Card title="Deadlines à venir" className="flex-1">
          {/* Ternary : if no deadlines, show message, otherwise show the list */}
          {upcomingDeadlines.length === 0 ? (
            <p className="text-center italic">Aucune deadline à venir</p>
          ) : (
            upcomingDeadlines.map((item) => (
              <div key={`${item.type}-${item.id}`} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.numero}</p>
                  <p className="text-caption text-text-placeholder">{item.client}</p>
                  {/* Conditional style : red if overdue, blue otherwise */}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${item.statut === "EN_RETARD" ? "text-alert border-alert" : "text-primary-300 border-primary-300"}`}>
                    {item.statut === "EN_RETARD" ? "En retard" : item.statut === "ENVOYEE" ? "Envoyée" : "Envoyé"}
                  </span>
                </div>
                <p className="text-caption">{new Date(item.date).toLocaleDateString("fr-FR")}</p>
              </div>
            ))
          )}
        </Card>

        <Card title="Dernières transactions" className="flex-1">
          {/* Ternary : if no transactions, show message, otherwise show the list */}
          {lastTransactions.length === 0 ? (
            <p className="text-center italic">Aucune transaction</p>
          ) : (
            lastTransactions.map((inv) => (
              <div key={inv.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <p className="text-caption">{new Date(inv.updated_at).toLocaleDateString("fr-FR")}</p>
                <p className="text-caption">{inv.numero} - {inv.client.raison_sociale}</p>
                {/* Green color for positive transactions */}
                <p className="text-caption font-medium text-green-600">+{Number(inv.total_ttc).toFixed(2)}€</p>
              </div>
            ))
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
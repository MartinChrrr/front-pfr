import { useMemo } from "react";
import { useInvoices } from "./useInvoices";
import { useQuotes } from "./useQuotes";
import type { Invoice, InvoiceStatus } from "../types/invoice";
import type { QuoteStatus } from "../types/quote";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

export type DeadlineType = "facture" | "devis";

export interface UpcomingDeadline {
  id: number;
  numero: string;
  client: string;
  date: string;
  statut: InvoiceStatus | QuoteStatus;
  type: DeadlineType;
}

export interface MonthlyRevenuePoint {
  month: string;
  total: number;
}

export interface DashboardData {
  monthlyRevenue: MonthlyRevenuePoint[];
  monthlyProfit: number;
  pendingTotal: number;
  upcomingDeadlines: UpcomingDeadline[];
  lastTransactions: Invoice[];
}

export function useDashboardData(): DashboardData {
  const { invoices } = useInvoices({});
  const { quotes } = useQuotes({});

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthlyRevenue = useMemo<MonthlyRevenuePoint[]>(() => {
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

  const monthlyProfit = useMemo(() => {
    return invoices
      .filter((inv) => {
        const date = new Date(inv.date_emission);
        return inv.statut === "PAYEE" && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
      })
      .reduce((sum, inv) => sum + Number(inv.total_ttc), 0);
  }, [invoices, currentYear, currentMonth]);

  const pendingTotal = useMemo(() => {
    const acceptedQuotes = quotes
      .filter((q) => q.statut === "ACCEPTE")
      .reduce((sum, q) => sum + Number(q.total_ttc), 0);
    const unpaidInvoices = invoices
      .filter((inv) => inv.statut === "ENVOYEE" || inv.statut === "EN_RETARD")
      .reduce((sum, inv) => sum + Number(inv.total_ttc), 0);
    return acceptedQuotes + unpaidInvoices;
  }, [invoices, quotes]);

  const upcomingDeadlines = useMemo<UpcomingDeadline[]>(() => {
    const invoiceDeadlines: UpcomingDeadline[] = invoices
      .filter((inv) => inv.statut === "ENVOYEE" || inv.statut === "EN_RETARD")
      .map((inv) => ({
        id: inv.id,
        numero: inv.numero,
        client: inv.client.raison_sociale,
        date: inv.date_echeance,
        statut: inv.statut,
        type: "facture",
      }));

    const quoteDeadlines: UpcomingDeadline[] = quotes
      .filter((q) => q.statut === "ENVOYE")
      .map((q) => ({
        id: q.id,
        numero: q.numero,
        client: q.client.raison_sociale,
        date: q.date_validite,
        statut: q.statut,
        type: "devis",
      }));

    return [...invoiceDeadlines, ...quoteDeadlines].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [invoices, quotes]);

  const lastTransactions = useMemo(() => {
    return invoices
      .filter((inv) => inv.statut === "PAYEE")
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 10);
  }, [invoices]);

  return { monthlyRevenue, monthlyProfit, pendingTotal, upcomingDeadlines, lastTransactions };
}

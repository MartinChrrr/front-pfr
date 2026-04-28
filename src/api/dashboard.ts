import api from "./api";
import type { InvoiceStatus } from "../types/invoice";
import type { QuoteStatus } from "../types/quote";

export interface MonthlyRevenuePoint {
  month: string;
  total: string;
}

export type DeadlineType = "facture" | "devis";

export interface UpcomingDeadline {
  id: number;
  numero: string;
  client: string;
  date: string;
  statut: InvoiceStatus | QuoteStatus;
  type: DeadlineType;
}

export interface LastTransaction {
  id: number;
  numero: string;
  client: string;
  updated_at: string;
  total_ttc: string;
}

export interface DashboardStats {
  monthly_revenue: MonthlyRevenuePoint[];
  monthly_profit: string;
  pending_total: string;
  upcoming_deadlines: UpcomingDeadline[];
  last_transactions: LastTransaction[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get("/dashboard/stats/");
  return response.data.data;
}

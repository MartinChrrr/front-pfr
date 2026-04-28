import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import type { DashboardStats, LastTransaction, UpcomingDeadline } from "../api/dashboard";

export type { LastTransaction, UpcomingDeadline };

export interface MonthlyRevenuePoint {
  month: string;
  total: number;
}

export interface DashboardData {
  monthlyRevenue: MonthlyRevenuePoint[];
  monthlyProfit: number;
  pendingTotal: number;
  upcomingDeadlines: UpcomingDeadline[];
  lastTransactions: LastTransaction[];
  isLoading: boolean;
  error: string | null;
}

const EMPTY_STATS: DashboardData = {
  monthlyRevenue: [],
  monthlyProfit: 0,
  pendingTotal: 0,
  upcomingDeadlines: [],
  lastTransactions: [],
  isLoading: true,
  error: null,
};

function toData(stats: DashboardStats): Omit<DashboardData, "isLoading" | "error"> {
  return {
    monthlyRevenue: stats.monthly_revenue.map((p) => ({ month: p.month, total: parseFloat(p.total) })),
    monthlyProfit: parseFloat(stats.monthly_profit),
    pendingTotal: parseFloat(stats.pending_total),
    upcomingDeadlines: stats.upcoming_deadlines,
    lastTransactions: stats.last_transactions,
  };
}

export function useDashboardData(): DashboardData {
  const [state, setState] = useState<DashboardData>(EMPTY_STATS);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true, error: null }));

    getDashboardStats()
      .then((stats) => {
        if (cancelled) return;
        setState({ ...toData(stats), isLoading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState((s) => ({ ...s, isLoading: false, error: err?.message ?? "Erreur de chargement" }));
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}

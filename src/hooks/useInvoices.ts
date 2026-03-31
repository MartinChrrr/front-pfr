import { useState, useEffect, useCallback } from "react";
import { getInvoices, type InvoiceFilters } from "../api/invoices";
import { invoiceToRow } from "../utils/mappers";
import type { Invoice } from "../types/invoice";
import type { FactureRowData } from "../components/ui/table/FactureRow";

export function useInvoices(filters?: InvoiceFilters) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    if (filters === undefined) {
      setInvoices([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getInvoices(filters)
      .then((res) => {
        if (!cancelled) {
          setInvoices(res.results);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message ?? "Erreur de chargement");
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [refreshKey, JSON.stringify(filters)]);

  const invoiceRows: FactureRowData[] = invoices.map(invoiceToRow);

  return { invoices, invoiceRows, isLoading, error, refresh };
}

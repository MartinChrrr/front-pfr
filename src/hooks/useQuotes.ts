import { useState, useEffect, useCallback } from "react";
import { getQuotes, type QuoteFilters } from "../api/quotes";
import { quoteToRow } from "../utils/mappers";
import type { Quote } from "../types/quote";
import type { DevisRowData } from "../components/ui/table/DevisRow";

export function useQuotes(filters?: QuoteFilters) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    if (filters === undefined) {
      setQuotes([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getQuotes(filters)
      .then((res) => {
        if (!cancelled) {
          setQuotes(res.results);
          setCount(res.count);
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

  const quoteRows: DevisRowData[] = quotes.map(quoteToRow);

  return { quotes, quoteRows, count, isLoading, error, refresh };
}

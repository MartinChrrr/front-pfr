import { useState, useEffect, useCallback } from "react";
import { getClients } from "../api/clients";
import { clientToRow } from "../utils/mappers";
import type { Client } from "../types/client";
import type { ClientRowData } from "../components/ui/table/ClientRow";

export interface ClientFilters {
  search?: string;
  ordering?: string;
  page?: number;
}

export function useClients(filters?: ClientFilters) {
  const [clients, setClients] = useState<Client[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    const params: Record<string, string | number> = {};
    if (filters?.page) params.page = filters.page;
    if (filters?.search) params.search = filters.search;
    if (filters?.ordering) params.ordering = filters.ordering;

    getClients(params)
      .then((res) => {
        if (!cancelled) {
          setClients(res.results);
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

  const clientRows: ClientRowData[] = clients.map(clientToRow);

  return { clients, clientRows, count, isLoading, error, refresh };
}

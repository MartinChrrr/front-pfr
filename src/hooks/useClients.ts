import { useState, useEffect, useCallback } from "react";
import { getClients } from "../api/clients";
import { clientToRow } from "../utils/mappers";
import type { Client } from "../types/client";
import type { ClientRowData } from "../components/ui/table/ClientRow";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getClients()
      .then((res) => {
        if (!cancelled) {
          setClients(res.results);
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
  }, [refreshKey]);

  const clientRows: ClientRowData[] = clients.map(clientToRow);

  return { clients, clientRows, isLoading, error, refresh };
}

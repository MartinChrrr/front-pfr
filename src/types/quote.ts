import type { Client } from "./client";

export type QuoteStatus = "BROUILLON" | "ENVOYE" | "ACCEPTE" | "REFUSE" | "EXPIRE";

export interface QuoteLine {
  id?: number;
  ordre: number;
  libelle: string;
  description: string;
  quantite: string;
  unite: string;
  prix_unitaire_ht: string;
  taux_tva: string;
  montant_ht: string;
}

export interface QuoteHistory {
  id: number;
  ancien_statut: QuoteStatus | null;
  nouveau_statut: QuoteStatus;
  created_at: string;
}

export interface Quote {
  id: number;
  utilisateur: number;
  client: Client;
  numero: string;
  date_emission: string;
  date_validite: string;
  statut: QuoteStatus;
  objet: string;
  notes: string;
  total_ht: string;
  total_tva: string;
  total_ttc: string;
  lignes: QuoteLine[];
  historique: QuoteHistory[];
  created_at: string;
  updated_at: string;
}

export interface QuoteLineInput {
  ordre?: number;
  libelle: string;
  description?: string;
  quantite: string;
  unite?: string;
  prix_unitaire_ht: string;
  taux_tva: string;
}

export interface QuoteInput {
  client_id: number;
  date_emission?: string;
  date_validite?: string;
  objet?: string;
  notes?: string;
  lignes: QuoteLineInput[];
}

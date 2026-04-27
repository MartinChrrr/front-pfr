import type { Client } from "./client";

export type InvoiceStatus = "BROUILLON" | "ENVOYEE" | "PAYEE" | "EN_RETARD";

export interface InvoiceLine {
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

export interface InvoiceHistory {
  id: number;
  ancien_statut: InvoiceStatus | null;
  nouveau_statut: InvoiceStatus;
  created_at: string;
}

export interface Invoice {
  id: number;
  utilisateur: number;
  client: Client;
  devis_origine: number | null;
  numero: string;
  date_emission: string;
  date_echeance: string;
  statut: InvoiceStatus;
  objet: string;
  notes: string;
  total_ht: string;
  total_tva: string;
  total_ttc: string;
  lignes: InvoiceLine[];
  historique: InvoiceHistory[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceLineInput {
  id?: number;
  ordre?: number;
  libelle: string;
  description?: string;
  quantite: string;
  unite?: string;
  prix_unitaire_ht: string;
  taux_tva: string;
}

export interface InvoiceInput {
  client_id: number;
  date_emission?: string;
  date_echeance?: string;
  objet?: string;
  notes?: string;
  lignes: InvoiceLineInput[];
}

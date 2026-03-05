import type { Client } from './client';

// --- Quote Types (Devis) ---

export type QuoteStatus = 'BROUILLON' | 'ENVOYE' | 'ACCEPTE' | 'REFUSE' | 'EXPIRE';

export interface Quote {
  id: number;
  user_id: number;
  client: Client;
  number: string;
  issue_date: string;
  validity_date: string;
  status: QuoteStatus;
  subject: string;
  notes: string;
  total_excl_tax: number;
  total_vat: number;
  total_incl_tax: number;
  lines: QuoteLine[];
  history: QuoteHistoryEntry[];
  created_at: string;
  updated_at: string;
}

export interface QuoteLine {
  id?: number;
  order: number;
  label: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price_excl_tax: number;
  vat_rate: number;
  amount_excl_tax: number;
}

export interface QuoteHistoryEntry {
  id: number;
  quote_id: number;
  previous_status: QuoteStatus | null;
  new_status: QuoteStatus;
  created_at: string;
}

// --- Payloads ---

export interface QuoteCreatePayload {
  client_id: number;
  issue_date: string;
  validity_date: string;
  subject: string;
  notes?: string;
  lines: QuoteLinePayload[];
}

export interface QuoteLinePayload {
  order: number;
  label: string;
  description?: string;
  quantity: number;
  unit: string;
  unit_price_excl_tax: number;
  vat_rate: number;
}
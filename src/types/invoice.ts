// --- Invoice Types (Facture) ---

export type InvoiceStatus = 'BROUILLON' | 'ENVOYEE' | 'PAYEE' | 'EN_RETARD';

export interface Invoice {
  id: number;
  user_id: number;
  client_id: number;
  source_quote_id: number | null;
  number: string;
  issue_date: string;
  due_date: string;
  status: InvoiceStatus;
  subject: string;
  notes: string;
  total_excl_tax: number;
  total_vat: number;
  total_incl_tax: number;
  lines: InvoiceLine[];
  history: InvoiceHistoryEntry[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceLine {
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

export interface InvoiceHistoryEntry {
  id: number;
  invoice_id: number;
  previous_status: InvoiceStatus | null;
  new_status: InvoiceStatus;
  created_at: string;
}

// --- Payloads ---

export interface InvoiceCreatePayload {
  client_id: number;
  source_quote_id?: number;
  issue_date: string;
  due_date: string;
  subject: string;
  notes?: string;
  lines: InvoiceLinePayload[];
}

export interface InvoiceLinePayload {
  order: number;
  label: string;
  description?: string;
  quantity: number;
  unit: string;
  unit_price_excl_tax: number;
  vat_rate: number;
}
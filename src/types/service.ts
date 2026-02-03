// --- Service Types (Prestation) ---

export type Unit = 'hour' | 'day' | 'flat_rate' | 'unit';

export type VatRate = 20 | 10 | 5.5 | 0;

export interface Service {
  id: number;
  user_id: number;
  label: string;
  description: string;
  unit_price_excl_tax: number;
  unit: Unit;
  vat_rate: VatRate;
  created_at: string;
  updated_at: string;
}

export interface ServiceCreatePayload {
  label: string;
  description?: string;
  unit_price_excl_tax: number;
  unit: Unit;
  vat_rate: VatRate;
}
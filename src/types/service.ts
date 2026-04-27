export type ServiceUnit = "heure" | "jour" | "forfait";

export type VatRate = "20.00" | "10.00" | "5.50" | "0.00";

export interface Service {
  id: number;
  label: string;
  description: string;
  unit_price_excl_tax: string;
  unit: ServiceUnit;
  taux_tva: VatRate;
  created_at: string;
  updated_at: string;
}

export interface ServiceInput {
  label: string;
  description?: string;
  unit_price_excl_tax: string;
  unit?: ServiceUnit;
  taux_tva?: VatRate;
}

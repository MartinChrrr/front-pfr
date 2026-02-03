// --- Auth Types ---

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  siret?: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  siret: string;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: number;
  user_id: number;
  next_quote_number: number;
  next_invoice_number: number;
  quote_prefix: string;
  invoice_prefix: string;
  payment_delay_days: number;
  quote_validity_days: number;
  created_at: string;
  updated_at: string;
}
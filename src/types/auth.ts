
export interface User {
  id: number;
  email: string;
  username: string;
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

export interface UserConfiguration {
  next_quote_number: number;
  next_invoice_number: number;
  quote_prefix: string;
  invoice_prefix: string;
  payment_deadline_days: number;
  quote_validity_days: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  siret?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  phone?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export type ProfileUpdateRequest = Partial<
  Pick<
    User,
    | "first_name"
    | "last_name"
    | "company_name"
    | "siret"
    | "address"
    | "postal_code"
    | "city"
    | "phone"
  >
>;

export type ConfigurationUpdateRequest = Partial<UserConfiguration>;

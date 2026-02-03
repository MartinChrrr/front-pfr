// --- Client Types ---

export interface Client {
  id: number;
  user_id: number;
  company_name: string;
  siret: string;
  email: string;
  phone: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  notes: string;
  addresses: Address[];
  created_at: string;
  updated_at: string;
}

export type AddressType = 'SIEGE' | 'FACTURATION' | 'LIVRAISON';

export interface Address {
  id: number;
  client_id: number;
  type: AddressType;
  line1: string;
  line2: string;
  postal_code: string;
  city: string;
  country: string;
  created_at: string;
  updated_at: string;
}

// --- Payloads for create/update ---

export interface ClientCreatePayload {
  company_name: string;
  siret?: string;
  email?: string;
  phone?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  notes?: string;
  addresses?: AddressCreatePayload[];
}

export interface AddressCreatePayload {
  type: AddressType;
  line1: string;
  line2?: string;
  postal_code: string;
  city: string;
  country?: string;
}
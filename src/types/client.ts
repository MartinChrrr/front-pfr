export type AddressType = "SIEGE" | "FACTURATION" | "LIVRAISON";

export interface Address {
  id: number;
  type: AddressType;
  ligne1: string;
  ligne2: string;
  code_postal: string;
  ville: string;
  pays: string;
  created_at: string;
  updated_at: string;
}

export interface AddressInput {
  type: AddressType;
  ligne1: string;
  ligne2?: string;
  code_postal: string;
  ville: string;
  pays?: string;
}

export interface Client {
  id: number;
  raison_sociale: string;
  siret: string;
  email: string;
  telephone: string;
  contact_nom: string;
  contact_email: string;
  contact_telephone: string;
  notes: string;
  adresses: Address[];
  created_at: string;
  updated_at: string;
}

export interface ClientInput {
  raison_sociale: string;
  siret?: string;
  email?: string;
  telephone?: string;
  contact_nom?: string;
  contact_email?: string;
  contact_telephone?: string;
  notes?: string;
  adresses?: AddressInput[];
}

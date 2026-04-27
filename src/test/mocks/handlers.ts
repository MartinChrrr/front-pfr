import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:8001/api";

// ---- Fixtures ----

export const mockUser = {
  id: 1,
  email: "test@example.com",
  username: "testuser",
  first_name: "Jean",
  last_name: "Dupont",
  company_name: "ACME SAS",
  siret: "12345678901234",
  address: "10 rue de Paris",
  postal_code: "75001",
  city: "Paris",
  phone: "0612345678",
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

export const mockConfiguration = {
  next_quote_number: 5,
  next_invoice_number: 3,
  quote_prefix: "DEV",
  invoice_prefix: "FAC",
  payment_deadline_days: 30,
  quote_validity_days: 30,
};

export const mockClient = {
  id: 1,
  raison_sociale: "Client SAS",
  siret: "98765432109876",
  email: "client@example.com",
  telephone: "0698765432",
  contact_nom: "Marie Martin",
  contact_email: "marie@client.com",
  contact_telephone: "0611223344",
  notes: "Client fidele",
  adresses: [
    {
      id: 1,
      type: "SIEGE" as const,
      ligne1: "5 avenue des Champs",
      ligne2: "",
      code_postal: "75008",
      ville: "Paris",
      pays: "France",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ],
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

export const mockQuote = {
  id: 1,
  utilisateur: 1,
  client: mockClient,
  numero: "DEV-005",
  date_emission: "2025-03-01",
  date_validite: "2025-03-31",
  statut: "BROUILLON" as const,
  objet: "Prestation de conseil",
  notes: "",
  total_ht: "1000.00",
  total_tva: "200.00",
  total_ttc: "1200.00",
  lignes: [
    {
      id: 1,
      ordre: 1,
      libelle: "Conseil",
      description: "Prestation de conseil",
      quantite: "10",
      unite: "heure",
      prix_unitaire_ht: "100.00",
      taux_tva: "20.00",
      montant_ht: "1000.00",
    },
  ],
  historique: [],
  created_at: "2025-03-01T00:00:00Z",
  updated_at: "2025-03-01T00:00:00Z",
};

export const mockInvoice = {
  id: 1,
  utilisateur: 1,
  client: mockClient,
  devis_origine: null,
  numero: "FAC-003",
  date_emission: "2025-03-15",
  date_echeance: "2025-04-14",
  statut: "BROUILLON" as const,
  objet: "Facture de conseil",
  notes: "",
  total_ht: "1000.00",
  total_tva: "200.00",
  total_ttc: "1200.00",
  lignes: [
    {
      id: 1,
      ordre: 1,
      libelle: "Conseil",
      description: "Prestation de conseil",
      quantite: "10",
      unite: "heure",
      prix_unitaire_ht: "100.00",
      taux_tva: "20.00",
      montant_ht: "1000.00",
    },
  ],
  historique: [],
  created_at: "2025-03-15T00:00:00Z",
  updated_at: "2025-03-15T00:00:00Z",
};

export const mockService = {
  id: 1,
  label: "Conseil",
  description: "Prestation de conseil",
  unit_price_excl_tax: "100.00",
  unit: "heure" as const,
  taux_tva: "20.00" as const,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

// ---- Handlers ----

export const handlers = [
  // Auth
  http.post(`${BASE_URL}/auth/login/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { access: "fake-access-token", refresh: "fake-refresh-token", user: mockUser },
    });
  }),

  http.post(`${BASE_URL}/auth/register/`, () => {
    return HttpResponse.json({ status: "success", data: mockUser }, { status: 201 });
  }),

  http.post(`${BASE_URL}/auth/logout/`, () => {
    return HttpResponse.json({ status: "success", data: null });
  }),

  http.post(`${BASE_URL}/auth/token/refresh/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { access: "new-access-token", refresh: "new-refresh-token" },
    });
  }),

  http.get(`${BASE_URL}/auth/me/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { user: mockUser, configuration: mockConfiguration },
    });
  }),

  http.get(`${BASE_URL}/auth/profile/`, () => {
    return HttpResponse.json({ status: "success", data: mockUser });
  }),

  http.patch(`${BASE_URL}/auth/profile/`, () => {
    return HttpResponse.json({ status: "success", data: mockUser });
  }),

  http.get(`${BASE_URL}/auth/configuration/`, () => {
    return HttpResponse.json({ status: "success", data: mockConfiguration });
  }),

  http.patch(`${BASE_URL}/auth/configuration/`, () => {
    return HttpResponse.json({ status: "success", data: mockConfiguration });
  }),

  // Clients
  http.get(`${BASE_URL}/clients/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { count: 1, next: null, previous: null, results: [mockClient] },
    });
  }),

  http.get(`${BASE_URL}/clients/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockClient });
  }),

  http.post(`${BASE_URL}/clients/`, () => {
    return HttpResponse.json({ status: "success", data: mockClient }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/clients/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockClient });
  }),

  http.delete(`${BASE_URL}/clients/:id/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Quotes
  http.get(`${BASE_URL}/quotes/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { count: 1, next: null, previous: null, results: [mockQuote] },
    });
  }),

  http.get(`${BASE_URL}/quotes/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockQuote });
  }),

  http.post(`${BASE_URL}/quotes/`, () => {
    return HttpResponse.json({ status: "success", data: mockQuote }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/quotes/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockQuote });
  }),

  http.delete(`${BASE_URL}/quotes/:id/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.post(`${BASE_URL}/quotes/:id/changer_statut/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { ...mockQuote, statut: "ENVOYE" },
    });
  }),

  // Invoices
  http.get(`${BASE_URL}/invoices/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { count: 1, next: null, previous: null, results: [mockInvoice] },
    });
  }),

  http.get(`${BASE_URL}/invoices/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockInvoice });
  }),

  http.post(`${BASE_URL}/invoices/`, () => {
    return HttpResponse.json({ status: "success", data: mockInvoice }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/invoices/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockInvoice });
  }),

  http.delete(`${BASE_URL}/invoices/:id/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.post(`${BASE_URL}/invoices/:id/changer_statut/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { ...mockInvoice, statut: "ENVOYEE" },
    });
  }),

  http.post(`${BASE_URL}/invoices/from-devis/`, () => {
    return HttpResponse.json({ status: "success", data: mockInvoice }, { status: 201 });
  }),

  // Services
  http.get(`${BASE_URL}/services/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { count: 1, next: null, previous: null, results: [mockService] },
    });
  }),

  http.get(`${BASE_URL}/services/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockService });
  }),

  http.post(`${BASE_URL}/services/`, () => {
    return HttpResponse.json({ status: "success", data: mockService }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/services/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockService });
  }),

  http.delete(`${BASE_URL}/services/:id/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Addresses
  http.get(`${BASE_URL}/adresses/`, () => {
    return HttpResponse.json({
      status: "success",
      data: { count: 1, next: null, previous: null, results: [mockClient.adresses[0]] },
    });
  }),

  http.post(`${BASE_URL}/adresses/`, () => {
    return HttpResponse.json({ status: "success", data: mockClient.adresses[0] }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/adresses/:id/`, () => {
    return HttpResponse.json({ status: "success", data: mockClient.adresses[0] });
  }),

  http.delete(`${BASE_URL}/adresses/:id/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

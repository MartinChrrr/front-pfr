import type { ClientRow } from "../components/ui/table/ClientsTable";
import type { DevisRow } from "../components/ui/table/DevisTable";
import type { FactureRow } from "../components/ui/table/FacturesTable";
import type { Client } from "../types/client";
import type { Quote } from "../types/quote";
import type { Invoice } from "../types/invoice";

export const sampleDevisRows: DevisRow[] = [
  { id: 1, number: "DEV-001", date: "12/01/2025", client: "Entreprise ABC", echeance: "12/02/2025", status: "ENVOYE", ttc: 1250.0 },
  { id: 2, number: "DEV-002", date: "15/01/2025", client: "Studio Graphique Martin", echeance: "15/02/2025", status: "ACCEPTE", ttc: 3400.5 },
  { id: 3, number: "DEV-003", date: "20/01/2025", client: "SARL Dupont & Fils", echeance: "20/02/2025", status: "BROUILLON", ttc: 780.0 },
  { id: 4, number: "DEV-004", date: "25/01/2025", client: "Tech Solutions SAS", echeance: "25/02/2025", status: "REFUSE", ttc: 5200.0 },
  { id: 5, number: "DEV-005", date: "01/02/2025", client: "Boulangerie du Coin", echeance: "01/03/2025", status: "EXPIRE", ttc: 620.0 },
  { id: 6, number: "DEV-006", date: "05/02/2025", client: "Agence Web Créative", echeance: "05/03/2025", status: "ENVOYE", ttc: 8900.0 },
];

export const sampleClientRows: ClientRow[] = [
  { id: 1, company_name: "Maitre", contact_name: "Jean Doucement", email: "jean.doucement@abc.fr", phone: "01 23 45 67 89" },
  { id: 2, company_name: "Studio Graphique Martin", contact_name: "Sophie Martin", email: "sophie@studio-martin.fr", phone: "06 12 34 56 78" },
  { id: 3, company_name: "SARL Dupont & Fils", contact_name: "Pierre Dupont", email: "p.dupont@dupontfils.fr", phone: "04 56 78 90 12" },
  { id: 4, company_name: "Tech Solutions SAS", contact_name: "Marie Leroy", email: "m.leroy@techsolutions.fr", phone: "07 89 01 23 45" },
  { id: 5, company_name: "Boulangerie du Coin", contact_name: "Paul Bernard", email: "contact@boulangerie-coin.fr", phone: "03 45 67 89 01" },
  { id: 6, company_name: "Agence Web Créative", contact_name: "Lucie Moreau", email: "lucie@agence-creative.fr", phone: "06 78 90 12 34" },
];

export const sampleFactureRows: FactureRow[] = [
  { id: 1, number: "FAC-001", date: "15/01/2025", client: "Entreprise ABC", echeance: "15/02/2025", status: "ENVOYEE", ttc: 1250.0 },
  { id: 2, number: "FAC-002", date: "20/01/2025", client: "Studio Graphique Martin", echeance: "20/02/2025", status: "PAYEE", ttc: 3400.5 },
  { id: 3, number: "FAC-003", date: "25/01/2025", client: "SARL Dupont & Fils", echeance: "25/02/2025", status: "BROUILLON", ttc: 780.0 },
  { id: 4, number: "FAC-004", date: "01/02/2025", client: "Tech Solutions SAS", echeance: "01/03/2025", status: "EN_RETARD", ttc: 5200.0 },
  { id: 5, number: "FAC-005", date: "05/02/2025", client: "Boulangerie du Coin", echeance: "05/03/2025", status: "PAYEE", ttc: 620.0 },
  { id: 6, number: "FAC-006", date: "10/02/2025", client: "Agence Web Créative", echeance: "10/03/2025", status: "ENVOYEE", ttc: 8900.0 },
];

export const fakeClient: Client = {
  id: 1,
  user_id: 1,
  contact_name: "Jean Doucement",
  company_name: "Maitre",
  siret: "123 456 789 00012",
  email: "contact@maitre.fr",
  phone: "01 23 45 67 89",
  contact_email: "jean.doucement@maitre.fr",
  contact_phone: "06 12 34 56 78",
  notes: "Client fidèle depuis 2020",
  addresses: [
    { id: 1, client_id: 1, type: "SIEGE", line1: "12 rue chez Laetitia", line2: "", postal_code: "75002", city: "Paris", country: "France", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  ],
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-06-15T00:00:00Z",
};

export const fakeDevis: Quote[] = [
  {
    id: 1, user_id: 1, client: fakeClient, number: "DEV-2024-001", issue_date: "2024-01-10", validity_date: "2024-02-10", status: "ACCEPTE", subject: "Création site vitrine", notes: "",
    total_excl_tax: 3000, total_vat: 600, total_incl_tax: 3600,
    lines: [
      { id: 1, order: 1, label: "Maquette UI/UX", description: "Design des pages principales", quantity: 1, unit: "forfait", unit_price_excl_tax: 1500, vat_rate: 20, amount_excl_tax: 1500 },
      { id: 2, order: 2, label: "Intégration front-end", description: "Développement HTML/CSS/JS", quantity: 1, unit: "forfait", unit_price_excl_tax: 1500, vat_rate: 20, amount_excl_tax: 1500 },
    ],
    history: [
      { id: 1, quote_id: 1, previous_status: null, new_status: "BROUILLON", created_at: "2024-01-10T00:00:00Z" },
      { id: 2, quote_id: 1, previous_status: "BROUILLON", new_status: "ENVOYE", created_at: "2024-01-12T00:00:00Z" },
      { id: 3, quote_id: 1, previous_status: "ENVOYE", new_status: "ACCEPTE", created_at: "2024-01-20T00:00:00Z" },
    ],
    created_at: "2024-01-10T00:00:00Z", updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: 2, user_id: 1, client: fakeClient, number: "DEV-2024-005", issue_date: "2024-03-15", validity_date: "2024-04-15", status: "ENVOYE", subject: "Maintenance annuelle", notes: "Inclut hébergement",
    total_excl_tax: 1200, total_vat: 240, total_incl_tax: 1440,
    lines: [
      { id: 3, order: 1, label: "Maintenance", description: "Support et mises à jour mensuelles", quantity: 12, unit: "mois", unit_price_excl_tax: 100, vat_rate: 20, amount_excl_tax: 1200 },
    ],
    history: [
      { id: 4, quote_id: 2, previous_status: null, new_status: "BROUILLON", created_at: "2024-03-15T00:00:00Z" },
      { id: 5, quote_id: 2, previous_status: "BROUILLON", new_status: "ENVOYE", created_at: "2024-03-16T00:00:00Z" },
    ],
    created_at: "2024-03-15T00:00:00Z", updated_at: "2024-03-16T00:00:00Z",
  },
  {
    id: 3, user_id: 1, client: fakeClient, number: "DEV-2024-008", issue_date: "2024-05-01", validity_date: "2024-06-01", status: "BROUILLON", subject: "Refonte identité visuelle", notes: "",
    total_excl_tax: 2500, total_vat: 500, total_incl_tax: 3000,
    lines: [
      { id: 4, order: 1, label: "Logo", description: "Création logo + déclinaisons", quantity: 1, unit: "forfait", unit_price_excl_tax: 1500, vat_rate: 20, amount_excl_tax: 1500 },
      { id: 5, order: 2, label: "Charte graphique", description: "Document de charte graphique complet", quantity: 1, unit: "forfait", unit_price_excl_tax: 1000, vat_rate: 20, amount_excl_tax: 1000 },
    ],
    history: [
      { id: 6, quote_id: 3, previous_status: null, new_status: "BROUILLON", created_at: "2024-05-01T00:00:00Z" },
    ],
    created_at: "2024-05-01T00:00:00Z", updated_at: "2024-05-01T00:00:00Z",
  },
];

export const fakeFactures: Invoice[] = [
  {
    id: 1, user_id: 1, client_id: 1, source_quote_id: 1, number: "FAC-2024-001", issue_date: "2024-01-25", due_date: "2024-02-25", status: "PAYEE", subject: "Création site vitrine", notes: "",
    total_excl_tax: 3000, total_vat: 600, total_incl_tax: 3600,
    lines: [
      { id: 1, order: 1, label: "Maquette UI/UX", description: "Design des pages principales", quantity: 1, unit: "forfait", unit_price_excl_tax: 1500, vat_rate: 20, amount_excl_tax: 1500 },
      { id: 2, order: 2, label: "Intégration front-end", description: "Développement HTML/CSS/JS", quantity: 1, unit: "forfait", unit_price_excl_tax: 1500, vat_rate: 20, amount_excl_tax: 1500 },
    ],
    history: [
      { id: 1, invoice_id: 1, previous_status: null, new_status: "BROUILLON", created_at: "2024-01-25T00:00:00Z" },
      { id: 2, invoice_id: 1, previous_status: "BROUILLON", new_status: "ENVOYEE", created_at: "2024-01-26T00:00:00Z" },
      { id: 3, invoice_id: 1, previous_status: "ENVOYEE", new_status: "PAYEE", created_at: "2024-02-10T00:00:00Z" },
    ],
    created_at: "2024-01-25T00:00:00Z", updated_at: "2024-02-10T00:00:00Z",
  },
  {
    id: 2, user_id: 1, client_id: 1, source_quote_id: null, number: "FAC-2024-003", issue_date: "2024-03-01", due_date: "2024-04-01", status: "EN_RETARD", subject: "Prestation consulting", notes: "Relance envoyée le 10/04",
    total_excl_tax: 800, total_vat: 160, total_incl_tax: 960,
    lines: [
      { id: 3, order: 1, label: "Consulting", description: "Audit technique et recommandations", quantity: 2, unit: "jour", unit_price_excl_tax: 400, vat_rate: 20, amount_excl_tax: 800 },
    ],
    history: [
      { id: 4, invoice_id: 2, previous_status: null, new_status: "BROUILLON", created_at: "2024-03-01T00:00:00Z" },
      { id: 5, invoice_id: 2, previous_status: "BROUILLON", new_status: "ENVOYEE", created_at: "2024-03-02T00:00:00Z" },
      { id: 6, invoice_id: 2, previous_status: "ENVOYEE", new_status: "EN_RETARD", created_at: "2024-04-02T00:00:00Z" },
    ],
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-04-02T00:00:00Z",
  },
  {
    id: 3, user_id: 1, client_id: 1, source_quote_id: null, number: "FAC-2024-007", issue_date: "2024-05-20", due_date: "2024-06-20", status: "ENVOYEE", subject: "Formation équipe dev", notes: "",
    total_excl_tax: 1500, total_vat: 300, total_incl_tax: 1800,
    lines: [
      { id: 4, order: 1, label: "Formation React", description: "Formation React avancé - 3 jours", quantity: 3, unit: "jour", unit_price_excl_tax: 500, vat_rate: 20, amount_excl_tax: 1500 },
    ],
    history: [
      { id: 7, invoice_id: 3, previous_status: null, new_status: "BROUILLON", created_at: "2024-05-20T00:00:00Z" },
      { id: 8, invoice_id: 3, previous_status: "BROUILLON", new_status: "ENVOYEE", created_at: "2024-05-21T00:00:00Z" },
    ],
    created_at: "2024-05-20T00:00:00Z", updated_at: "2024-05-21T00:00:00Z",
  },
];

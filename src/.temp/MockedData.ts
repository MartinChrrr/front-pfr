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
  raison_sociale: "Maitre",
  siret: "123 456 789 00012",
  email: "contact@maitre.fr",
  telephone: "01 23 45 67 89",
  contact_nom: "Jean Doucement",
  contact_email: "jean.doucement@maitre.fr",
  contact_telephone: "06 12 34 56 78",
  notes: "Client fidèle depuis 2020",
  adresses: [
    { id: 1, type: "SIEGE", ligne1: "12 rue chez Laetitia", ligne2: "", code_postal: "75002", ville: "Paris", pays: "France", created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  ],
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-06-15T00:00:00Z",
};

export const fakeDevis: Quote[] = [
  {
    id: 1, utilisateur: 1, client: fakeClient, numero: "DEV-2024-001", date_emission: "2024-01-10", date_validite: "2024-02-10", statut: "ACCEPTE", objet: "Création site vitrine", notes: "",
    total_ht: "3000.00", total_tva: "600.00", total_ttc: "3600.00",
    lignes: [
      { id: 1, ordre: 1, libelle: "Maquette UI/UX", description: "Design des pages principales", quantite: "1", unite: "forfait", prix_unitaire_ht: "1500.00", taux_tva: "20.00", montant_ht: "1500.00" },
      { id: 2, ordre: 2, libelle: "Intégration front-end", description: "Développement HTML/CSS/JS", quantite: "1", unite: "forfait", prix_unitaire_ht: "1500.00", taux_tva: "20.00", montant_ht: "1500.00" },
    ],
    historique: [
      { id: 1, ancien_statut: null, nouveau_statut: "BROUILLON", created_at: "2024-01-10T00:00:00Z" },
      { id: 2, ancien_statut: "BROUILLON", nouveau_statut: "ENVOYE", created_at: "2024-01-12T00:00:00Z" },
      { id: 3, ancien_statut: "ENVOYE", nouveau_statut: "ACCEPTE", created_at: "2024-01-20T00:00:00Z" },
    ],
    created_at: "2024-01-10T00:00:00Z", updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: 2, utilisateur: 1, client: fakeClient, numero: "DEV-2024-005", date_emission: "2024-03-15", date_validite: "2024-04-15", statut: "ENVOYE", objet: "Maintenance annuelle", notes: "Inclut hébergement",
    total_ht: "1200.00", total_tva: "240.00", total_ttc: "1440.00",
    lignes: [
      { id: 3, ordre: 1, libelle: "Maintenance", description: "Support et mises à jour mensuelles", quantite: "12", unite: "mois", prix_unitaire_ht: "100.00", taux_tva: "20.00", montant_ht: "1200.00" },
    ],
    historique: [
      { id: 4, ancien_statut: null, nouveau_statut: "BROUILLON", created_at: "2024-03-15T00:00:00Z" },
      { id: 5, ancien_statut: "BROUILLON", nouveau_statut: "ENVOYE", created_at: "2024-03-16T00:00:00Z" },
    ],
    created_at: "2024-03-15T00:00:00Z", updated_at: "2024-03-16T00:00:00Z",
  },
  {
    id: 3, utilisateur: 1, client: fakeClient, numero: "DEV-2024-008", date_emission: "2024-05-01", date_validite: "2024-06-01", statut: "BROUILLON", objet: "Refonte identité visuelle", notes: "",
    total_ht: "2500.00", total_tva: "500.00", total_ttc: "3000.00",
    lignes: [
      { id: 4, ordre: 1, libelle: "Logo", description: "Création logo + déclinaisons", quantite: "1", unite: "forfait", prix_unitaire_ht: "1500.00", taux_tva: "20.00", montant_ht: "1500.00" },
      { id: 5, ordre: 2, libelle: "Charte graphique", description: "Document de charte graphique complet", quantite: "1", unite: "forfait", prix_unitaire_ht: "1000.00", taux_tva: "20.00", montant_ht: "1000.00" },
    ],
    historique: [
      { id: 6, ancien_statut: null, nouveau_statut: "BROUILLON", created_at: "2024-05-01T00:00:00Z" },
    ],
    created_at: "2024-05-01T00:00:00Z", updated_at: "2024-05-01T00:00:00Z",
  },
];

export const fakeFactures: Invoice[] = [
  {
    id: 1, utilisateur: 1, client: fakeClient, devis_origine: 1, numero: "FAC-2024-001", date_emission: "2024-01-25", date_echeance: "2024-02-25", statut: "PAYEE", objet: "Création site vitrine", notes: "",
    total_ht: "3000.00", total_tva: "600.00", total_ttc: "3600.00",
    lignes: [
      { id: 1, ordre: 1, libelle: "Maquette UI/UX", description: "Design des pages principales", quantite: "1", unite: "forfait", prix_unitaire_ht: "1500.00", taux_tva: "20.00", montant_ht: "1500.00" },
      { id: 2, ordre: 2, libelle: "Intégration front-end", description: "Développement HTML/CSS/JS", quantite: "1", unite: "forfait", prix_unitaire_ht: "1500.00", taux_tva: "20.00", montant_ht: "1500.00" },
    ],
    historique: [
      { id: 1, ancien_statut: null, nouveau_statut: "BROUILLON", created_at: "2024-01-25T00:00:00Z" },
      { id: 2, ancien_statut: "BROUILLON", nouveau_statut: "ENVOYEE", created_at: "2024-01-26T00:00:00Z" },
      { id: 3, ancien_statut: "ENVOYEE", nouveau_statut: "PAYEE", created_at: "2024-02-10T00:00:00Z" },
    ],
    created_at: "2024-01-25T00:00:00Z", updated_at: "2024-02-10T00:00:00Z",
  },
  {
    id: 2, utilisateur: 1, client: fakeClient, devis_origine: null, numero: "FAC-2024-003", date_emission: "2024-03-01", date_echeance: "2024-04-01", statut: "EN_RETARD", objet: "Prestation consulting", notes: "Relance envoyée le 10/04",
    total_ht: "800.00", total_tva: "160.00", total_ttc: "960.00",
    lignes: [
      { id: 3, ordre: 1, libelle: "Consulting", description: "Audit technique et recommandations", quantite: "2", unite: "jour", prix_unitaire_ht: "400.00", taux_tva: "20.00", montant_ht: "800.00" },
    ],
    historique: [
      { id: 4, ancien_statut: null, nouveau_statut: "BROUILLON", created_at: "2024-03-01T00:00:00Z" },
      { id: 5, ancien_statut: "BROUILLON", nouveau_statut: "ENVOYEE", created_at: "2024-03-02T00:00:00Z" },
      { id: 6, ancien_statut: "ENVOYEE", nouveau_statut: "EN_RETARD", created_at: "2024-04-02T00:00:00Z" },
    ],
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-04-02T00:00:00Z",
  },
  {
    id: 3, utilisateur: 1, client: fakeClient, devis_origine: null, numero: "FAC-2024-007", date_emission: "2024-05-20", date_echeance: "2024-06-20", statut: "ENVOYEE", objet: "Formation équipe dev", notes: "",
    total_ht: "1500.00", total_tva: "300.00", total_ttc: "1800.00",
    lignes: [
      { id: 4, ordre: 1, libelle: "Formation React", description: "Formation React avancé - 3 jours", quantite: "3", unite: "jour", prix_unitaire_ht: "500.00", taux_tva: "20.00", montant_ht: "1500.00" },
    ],
    historique: [
      { id: 7, ancien_statut: null, nouveau_statut: "BROUILLON", created_at: "2024-05-20T00:00:00Z" },
      { id: 8, ancien_statut: "BROUILLON", nouveau_statut: "ENVOYEE", created_at: "2024-05-21T00:00:00Z" },
    ],
    created_at: "2024-05-20T00:00:00Z", updated_at: "2024-05-21T00:00:00Z",
  },
];

# Front-PFR

Application front-end de gestion commerciale (devis, factures, clients) construite avec React 19, TypeScript et Vite.

## Prerequis

- [Node.js](https://nodejs.org/) >= 22
- npm >= 10

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd front-pfr

# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.sample .env
```

### Variables d'environnement

| Variable             | Description                | Valeur par defaut               |
| -------------------- | -------------------------- | ------------------------------- |
| `VITE_API_PORT`      | Port de l'API back-end     | `8001`                          |
| `VITE_API_BASE_URL`  | URL de base de l'API       | `http://localhost:8001/api`     |

## Scripts disponibles

| Commande               | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Lance le serveur de developpement (Vite) |
| `npm run build`        | Compile TypeScript puis build production |
| `npm run lint`         | Lint du code avec ESLint                 |
| `npm run preview`      | Previsualise le build de production      |
| `npm test`             | Lance tous les tests (Vitest)            |
| `npm run test:watch`   | Tests en mode watch interactif           |
| `npm run test:coverage`| Tests + rapport de couverture            |

## Stack technique

| Categorie      | Technologie                                |
| -------------- | ------------------------------------------ |
| Framework      | React 19                                   |
| Langage        | TypeScript 5.9                             |
| Build          | Vite 7                                     |
| Styling        | Tailwind CSS 4                             |
| Routing        | React Router 7                             |
| Formulaires    | React Hook Form + Zod                      |
| HTTP           | Axios (intercepteurs JWT, refresh auto)    |
| Icones         | Lucide React                               |
| Date/Heure     | Luxon                                      |
| Graphiques     | Recharts                                   |
| Tests          | Vitest + Testing Library + MSW             |

## Architecture du projet

```
src/
├── api/                           # Couche d'integration API (Axios)
│   ├── api.ts                     #   Instance Axios, tokens JWT, intercepteurs, refresh auto
│   ├── auth.ts                    #   Endpoints d'authentification
│   ├── clients.ts                 #   CRUD clients + adresses
│   ├── quotes.ts                  #   CRUD devis + changement statut + PDF
│   ├── invoices.ts                #   CRUD factures + statut + PDF + creation depuis devis
│   ├── services.ts                #   CRUD prestations
│   └── handleFormErrors.ts        #   Mapping erreurs JSend → React Hook Form
│
├── components/
│   ├── ui/                        # Composants UI reutilisables
│   │   ├── Button.tsx             #   Bouton (primary | outline)
│   │   ├── Card.tsx               #   Carte avec titre
│   │   ├── Modal.tsx              #   Modal accessible (focus trap, Escape)
│   │   ├── SearchBar.tsx          #   Barre de recherche
│   │   ├── Pagination.tsx         #   Pagination avec ellipses
│   │   ├── DropdownButton.tsx     #   Menu contextuel (...)
│   │   ├── StatusBadge.tsx        #   Badge de statut colore
│   │   ├── Separator.tsx          #   Separateur horizontal
│   │   └── table/                 #   Tableaux responsives (clients, devis, factures)
│   ├── forms/                     # Formulaires metier (login, register, edition, statut)
│   ├── Client/                    # Composants specifiques clients
│   ├── Quotes/                    # Composants specifiques devis
│   ├── Invoices/                  # Composants specifiques factures
│   ├── ProtectedRoute.tsx         # Guard : routes authentifiees
│   └── GuestRoute.tsx             # Guard : routes invites uniquement
│
├── hooks/                         # Custom hooks React
│   ├── useAuth.tsx                #   Contexte auth (user, config, login, logout)
│   ├── useClients.ts              #   Fetch clients avec pagination et recherche
│   ├── useQuotes.ts               #   Fetch devis avec filtres
│   ├── useInvoices.ts             #   Fetch factures avec filtres
│   └── useDebouncedValue.ts       #   Debounce generique (300ms)
│
├── layouts/                       # Layouts de pages
│   ├── MainLayout.tsx             #   Sidebar + contenu principal
│   ├── AuthLayout.tsx             #   Pages d'authentification (centre)
│   ├── DetailsLayout.tsx          #   Pages de details (header + sidebar)
│   ├── Sidebar.tsx                #   Sidebar desktop + drawer mobile
│   └── ...                        #   MobileHeader, HeaderDetails, SidebarItem, etc.
│
├── pages/                         # Pages de l'application
│   ├── Dashboard.tsx              #   Tableau de bord (stats, graphique, deadlines)
│   ├── Clients.tsx                #   Liste clients (CRUD modal, recherche, pagination)
│   ├── ClientDetails.tsx          #   Detail client + documents lies
│   ├── Quotes.tsx                 #   Liste devis (CRUD, statut, PDF)
│   ├── DevisDetails.tsx           #   Detail devis (edition, conversion en facture)
│   ├── Invoices.tsx               #   Liste factures (CRUD, statut, PDF)
│   ├── FactureDetails.tsx         #   Detail facture
│   ├── Login.tsx / Register.tsx   #   Authentification
│   ├── Onboarding.tsx             #   Onboarding (2 etapes)
│   └── Settings.tsx               #   Parametres (profil + configuration)
│
├── types/                         # Definitions TypeScript
│   ├── index.ts                   #   PaginatedResponse, JSendResponse
│   ├── auth.ts                    #   User, UserConfiguration, LoginRequest
│   ├── client.ts                  #   Client, Address, ClientInput
│   ├── quote.ts                   #   Quote, QuoteLine, QuoteStatus
│   ├── invoice.ts                 #   Invoice, InvoiceLine, InvoiceStatus
│   └── service.ts                 #   Service, ServiceUnit, VatRate
│
├── utils/                         # Utilitaires (mappers, dates)
│
├── test/                          # Infrastructure de tests
│   ├── setup.ts                   #   Setup global (jest-dom, MSW, cleanup)
│   ├── helpers.tsx                #   renderWithProviders
│   └── mocks/                     #   Fixtures + handlers MSW
│
├── App.tsx                        # Routes (AuthProvider + GuestRoute/ProtectedRoute)
├── App.css                        # Design system Tailwind (couleurs, typo)
└── main.tsx                       # Point d'entree (BrowserRouter + StrictMode)
```

## Routes

### Routes publiques (invites)

Accessibles uniquement aux utilisateurs non connectes. Redirection vers `/` si authentifie.

| Route                  | Page                    | Description                       |
| ---------------------- | ----------------------- | --------------------------------- |
| `/login`               | Login                   | Connexion                         |
| `/register`            | Register                | Inscription                       |
| `/onboarding`          | Onboarding              | Onboarding 1/2 : infos entreprise |
| `/user-configuration`  | OnboardingConfiguration | Onboarding 2/2 : configuration    |

### Routes protegees (authentifiees)

Accessibles uniquement aux utilisateurs connectes. Redirection vers `/login` sinon.

| Route            | Page             | Description                              |
| ---------------- | ---------------- | ---------------------------------------- |
| `/`              | Dashboard        | Tableau de bord (stats, graphique, deadlines) |
| `/devis`         | Quotes           | Liste des devis                          |
| `/devis/:id`     | DevisDetails     | Detail d'un devis                        |
| `/factures`      | Invoices         | Liste des factures                       |
| `/factures/:id`  | FactureDetails   | Detail d'une facture                     |
| `/clients`       | Clients          | Liste des clients                        |
| `/clients/:id`   | ClientDetails    | Detail d'un client                       |
| `/settings`      | Settings         | Parametres profil et configuration       |

## Fonctionnalites principales

### Authentification

- Authentification JWT (access + refresh token) avec rafraichissement automatique
- Inscription avec onboarding en 2 etapes (profil entreprise + configuration metier)
- Guards de routes : `ProtectedRoute` et `GuestRoute`

### Gestion des clients

- Liste paginee avec recherche debouncee
- Creation et suppression via modales
- Page detail avec informations, devis et factures lies

### Gestion des devis

- Cycle : `Brouillon → Envoye → Accepte / Refuse / Expire`
- Lignes de prestation dynamiques (ajout/suppression)
- Calcul automatique des totaux (HT, TVA, TTC)
- Conversion d'un devis accepte en facture
- Telechargement PDF

### Gestion des factures

- Cycle : `Brouillon → Envoyee → Payee / En retard → Payee`
- Transitions de statut restreintes (pas de retour en arriere)
- Creation depuis un devis existant
- Telechargement PDF

### Dashboard

- Benefice du mois (factures payees)
- Entrees en attente (devis acceptes + factures non payees)
- Graphique des revenus annuels (Recharts)
- Deadlines a venir et dernieres transactions

### Parametres

- Edition du profil utilisateur
- Configuration metier (prefixes, numeros, delais de paiement/validite)

## Tests

L'application dispose d'une suite de **129 tests** couvrant :

| Couche               | Fichiers | Tests | Description                                           |
| -------------------- | -------- | ----- | ----------------------------------------------------- |
| Utilitaires          | 2        | 12    | Mappers, formatage de dates, calculs                  |
| API                  | 6        | 32    | CRUD complet (auth, clients, devis, factures, services) |
| Hooks                | 5        | 27    | useAuth, useClients, useQuotes, useInvoices, useDebouncedValue |
| Composants UI        | 5        | 38    | Button, Modal, SearchBar, Pagination, StatusBadge     |
| Guards               | 2        | 4     | ProtectedRoute, GuestRoute                            |
| Formulaires          | 1        | 8     | LoginForm (validation client + serveur)               |
| **Total**            | **21**   | **129** |                                                       |

Les tests utilisent **MSW** (Mock Service Worker) pour intercepter les appels API au niveau reseau, assurant des tests realistes sans dependance au backend.

```bash
npm test              # Lancer les tests
npm run test:watch    # Mode watch
npm run test:coverage # Rapport de couverture
```

## Documentation technique

La documentation technique complete est disponible dans [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Elle couvre :

- Architecture detaillee de chaque couche
- Endpoints API complets avec parametres
- Gestion des tokens JWT et rafraichissement automatique
- Format JSend et gestion des erreurs
- Systeme de layouts et responsive design
- Modeles de donnees TypeScript
- Design system (couleurs, typographie)
- Parcours utilisateur detailles

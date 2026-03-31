# Front PFR

Application front-end de gestion commerciale (devis, factures, clients) construite avec React, TypeScript et Vite.

## Prérequis

- [Node.js](https://nodejs.org/) >= 22
- npm >= 10

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd front-pfr

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.sample .env
```

### Variables d'environnement

| Variable             | Description                | Valeur par défaut               |
| -------------------- | -------------------------- | ------------------------------- |
| `VITE_API_PORT`      | Port de l'API back-end     | `8001`                          |
| `VITE_API_BASE_URL`  | URL de base de l'API       | `http://localhost:8001/api`     |

### Scripts disponibles

| Commande          | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Lance le serveur de développement (Vite) |
| `npm run build`   | Compile TypeScript puis build production |
| `npm run lint`    | Lint du code avec ESLint                 |
| `npm run preview` | Prévisualise le build de production      |

## Architecture du projet

```
src/
├── api/                    # Couche d'intégration API (Axios)
│   ├── api.ts              #   Instance Axios & gestion des tokens
│   ├── auth.ts             #   Endpoints d'authentification
│   ├── clients.ts          #   CRUD clients
│   ├── invoices.ts         #   Endpoints factures
│   ├── quotes.ts           #   Endpoints devis
│   ├── services.ts         #   Endpoints services
│   └── handleFormErrors.ts #   Utilitaire de gestion d'erreurs formulaires
│
├── components/
│   ├── ui/                 # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── SearchBar.tsx
│   │   ├── DropdownButton.tsx
│   │   ├── Separator.tsx
│   │   ├── StatusBadge.tsx
│   │   └── table/          #   Composants table (clients, devis, factures)
│   ├── forms/              # Formulaires (login, register, édition, etc.)
│   ├── Client/             # Composants spécifiques aux clients
│   ├── Quotes/             # Composants spécifiques aux devis
│   ├── Invoices/           # Composants spécifiques aux factures
│   ├── ProtectedRoute.tsx  # Guard : routes authentifiées
│   └── GuestRoute.tsx      # Guard : routes invités uniquement
│
├── hooks/                  # Custom hooks React
│   ├── useAuth.tsx         #   Contexte & hook d'authentification
│   ├── useClients.ts       #   Hook données clients
│   ├── useInvoices.ts      #   Hook données factures
│   └── useQuotes.ts        #   Hook données devis
│
├── layouts/                # Layouts de pages
│   ├── MainLayout.tsx      #   Layout principal (sidebar + contenu)
│   ├── AuthLayout.tsx      #   Layout pages d'authentification
│   ├── DetailsLayout.tsx   #   Layout pages de détails
│   ├── Sidebar.tsx         #   Barre latérale de navigation
│   └── HeaderDetails.tsx   #   En-tête des pages de détails
│
├── pages/                  # Pages de l'application
│   ├── Dashboard.tsx       #   Tableau de bord
│   ├── Clients.tsx         #   Liste des clients
│   ├── ClientDetails.tsx   #   Détails d'un client
│   ├── Quotes.tsx          #   Liste des devis
│   ├── DevisDetails.tsx    #   Détails d'un devis
│   ├── Invoices.tsx        #   Liste des factures
│   ├── FactureDetails.tsx  #   Détails d'une facture
│   ├── Login.tsx           #   Connexion
│   ├── Register.tsx        #   Inscription
│   └── Onboarding.tsx      #   Onboarding
│
├── types/                  # Définitions TypeScript
│
├── utils/                  # Utilitaires (mappers, transformations)
│
├── App.tsx                 # Composant racine & configuration des routes
└── main.tsx                # Point d'entrée de l'application
```

### Stack technique

| Catégorie      | Technologie                                |
| -------------- | ------------------------------------------ |
| Framework      | React 19                                   |
| Langage        | TypeScript 5.9                             |
| Build          | Vite 7                                     |
| Styling        | Tailwind CSS 4                             |
| Routing        | React Router 7                             |
| Formulaires    | React Hook Form + Zod                      |
| HTTP           | Axios                                      |
| Icônes         | Lucide React                               |
| Date/Heure     | Luxon                                      |

### Routes

**Routes publiques (invités)**

| Route          | Page         |
| -------------- | ------------ |
| `/login`       | Connexion    |
| `/register`    | Inscription  |
| `/onboarding`  | Onboarding   |

**Routes protégées (authentifiées)**

| Route           | Page                |
| --------------- | ------------------- |
| `/`             | Tableau de bord     |
| `/devis`        | Liste des devis     |
| `/devis/:id`    | Détails d'un devis  |
| `/factures`     | Liste des factures  |
| `/factures/:id` | Détails d'une facture |
| `/clients`      | Liste des clients   |
| `/clients/:id`  | Détails d'un client |

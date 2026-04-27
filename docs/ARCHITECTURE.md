# Architecture du projet Front-PFR

## Vue d'ensemble

Front-PFR est une application de gestion commerciale (devis, factures, clients) construite avec React 19, TypeScript et Vite. L'application communique avec une API REST Django via Axios et utilise le format de reponse JSend.

---

## Stack technique

| Categorie      | Technologie        | Version | Role                                        |
| -------------- | ------------------ | ------- | ------------------------------------------- |
| Framework      | React              | 19      | Bibliotheque UI                             |
| Langage        | TypeScript         | 5.9     | Typage statique                             |
| Build          | Vite               | 7       | Bundler et serveur de developpement         |
| Styling        | Tailwind CSS       | 4       | Utilitaires CSS                             |
| Routing        | React Router DOM   | 7       | Navigation SPA                              |
| Formulaires    | React Hook Form    | 7       | Gestion d'etat des formulaires              |
| Validation     | Zod                | 4       | Validation de schemas (via @hookform/resolvers) |
| HTTP           | Axios              | 1.13    | Client HTTP avec intercepteurs              |
| Icones         | Lucide React       | 0.563   | Bibliotheque d'icones SVG                   |
| Date/Heure     | Luxon              | 3.7     | Manipulation et formatage de dates          |
| Police         | Inter Variable     | -       | Police d'interface via @fontsource          |
| Graphiques     | Recharts           | -       | Graphiques du dashboard                     |
| Tests          | Vitest             | 4       | Test runner                                 |
| Tests DOM      | Testing Library    | 16      | Tests de composants React                   |
| Mocks API      | MSW                | 2       | Mock Service Worker pour les tests          |

---

## Point d'entree

```
index.html
  └── src/main.tsx          # createRoot + BrowserRouter + StrictMode
        └── src/App.tsx      # AuthProvider + Routes
```

`main.tsx` initialise l'application React dans un `BrowserRouter` avec `StrictMode`. `App.tsx` enveloppe toutes les routes dans un `AuthProvider` qui fournit le contexte d'authentification a toute l'application.

---

## Arborescence des fichiers

```
src/
├── api/                           # Couche d'integration API
│   ├── api.ts                     #   Instance Axios, tokens, intercepteurs, refresh auto
│   ├── auth.ts                    #   login, register, logout, getCurrentUser, profile, configuration
│   ├── clients.ts                 #   CRUD clients + adresses
│   ├── quotes.ts                  #   CRUD devis + changement statut + PDF
│   ├── invoices.ts                #   CRUD factures + statut + PDF + creation depuis devis
│   ├── services.ts                #   CRUD prestations
│   ├── handleFormErrors.ts        #   Mapping erreurs JSend → React Hook Form
│   └── index.ts                   #   Re-exports
│
├── components/
│   ├── ui/                        # Composants UI generiques et reutilisables
│   │   ├── Button.tsx             #   Bouton (primary | outline)
│   │   ├── Card.tsx               #   Carte avec titre et bordure optionnelle
│   │   ├── Modal.tsx              #   Modal accessible (focus trap, Escape, overlay)
│   │   ├── SearchBar.tsx          #   Barre de recherche avec icone
│   │   ├── Pagination.tsx         #   Pagination avec ellipses et navigation
│   │   ├── DropdownButton.tsx     #   Menu contextuel (...) avec positionnement auto
│   │   ├── StatusBadge.tsx        #   Badge de statut colore (devis/factures)
│   │   ├── Separator.tsx          #   Separateur horizontal
│   │   └── table/                 #   Composants de tableaux
│   │       ├── ClientsTable.tsx   #     Tableau clients responsive
│   │       ├── ClientRow.tsx      #     Ligne de tableau client (NavLink)
│   │       ├── DevisTable.tsx     #     Tableau devis responsive
│   │       ├── DevisRow.tsx       #     Ligne de tableau devis (NavLink + StatusBadge)
│   │       ├── FacturesTable.tsx  #     Tableau factures responsive
│   │       └── FactureRow.tsx     #     Ligne de tableau facture (NavLink + StatusBadge)
│   │
│   ├── forms/                     # Formulaires metier
│   │   ├── LoginForm.tsx          #   Connexion (email + mot de passe)
│   │   ├── RegisterForm.tsx       #   Inscription (nom, email, mdp, confirmation)
│   │   ├── EditClientForm.tsx     #   Edition client (infos, contact, adresse)
│   │   ├── EditQuoteForm.tsx      #   Edition devis (client, dates, lignes dynamiques)
│   │   ├── EditInvoiceForm.tsx    #   Edition facture (client, dates, lignes dynamiques)
│   │   ├── ChangeQuoteStatusForm.tsx    #   Changement statut devis (dropdown)
│   │   ├── ChangeInvoiceStatusForm.tsx  #   Changement statut facture (transitions restreintes)
│   │   ├── ProfileSettingsForm.tsx      #   Parametres profil utilisateur
│   │   ├── ConfigurationSettingsForm.tsx #  Parametres metier (prefixes, delais)
│   │   ├── OnboardingForm.tsx           #   Onboarding 1/2 : infos entreprise
│   │   └── OnboardingConfigForm.tsx     #   Onboarding 2/2 : configuration metier
│   │
│   ├── Client/                    # Composants specifiques client
│   │   ├── ClientCard.tsx         #   Carte detail client complete
│   │   └── BillingRowClientCard.tsx #  Ligne devis/facture dans la carte client
│   │
│   ├── Quotes/                    # Composants specifiques devis
│   │   ├── QuotesDetailsCard.tsx  #   Carte detail devis (lignes, totaux)
│   │   └── LittleClientsCard.tsx  #   Carte client compacte (sidebar details)
│   │
│   ├── Invoices/                  # Composants specifiques factures
│   │   └── InvoicesDetailsCard.tsx #  Carte detail facture (lignes, totaux)
│   │
│   ├── ProtectedRoute.tsx         # Guard : redirige vers /login si non authentifie
│   └── GuestRoute.tsx             # Guard : redirige vers / si authentifie
│
├── hooks/                         # Custom hooks React
│   ├── useAuth.tsx                #   Contexte auth (user, config, login, logout, refreshUser)
│   ├── useClients.ts              #   Fetch clients avec pagination, search, refresh
│   ├── useQuotes.ts               #   Fetch devis avec filtres (statut, client, search)
│   ├── useInvoices.ts             #   Fetch factures avec filtres etendus
│   └── useDebouncedValue.ts       #   Debounce generique (300ms par defaut)
│
├── layouts/                       # Layouts de pages
│   ├── MainLayout.tsx             #   Layout principal (Sidebar + MobileHeader + main)
│   ├── AuthLayout.tsx             #   Layout auth (centre, logo, fond neutre)
│   ├── DetailsLayout.tsx          #   Layout pages de details (Sidebar + HeaderDetails)
│   ├── Sidebar.tsx                #   Barre laterale desktop + drawer mobile
│   ├── MobileHeader.tsx           #   Header mobile avec bouton hamburger
│   ├── HeaderDetails.tsx          #   En-tete pages detail (retour, titre, actions)
│   ├── SidebarProfile.tsx         #   Section profil dans la sidebar
│   ├── SidebarItem.tsx            #   Element de navigation sidebar (NavLink)
│   ├── SidebarItemGroup.tsx       #   Groupe depliable sidebar (Devis et Factures)
│   └── sidebarConfig.ts           #   Configuration des elements de la sidebar
│
├── pages/                         # Pages de l'application
│   ├── Dashboard.tsx              #   Tableau de bord (stats, graphique, deadlines)
│   ├── Clients.tsx                #   Liste clients (recherche, pagination, CRUD modal)
│   ├── ClientDetails.tsx          #   Detail client (infos, devis/factures lies)
│   ├── Quotes.tsx                 #   Liste devis (recherche, pagination, CRUD modal)
│   ├── DevisDetails.tsx           #   Detail devis (edition, statut, conversion facture)
│   ├── Invoices.tsx               #   Liste factures (recherche, pagination, CRUD modal)
│   ├── FactureDetails.tsx         #   Detail facture (envoi PDF, statut)
│   ├── Login.tsx                  #   Page de connexion
│   ├── Register.tsx               #   Page d'inscription
│   ├── Onboarding.tsx             #   Onboarding 1/2 : profil entreprise
│   ├── OnboardingConfiguration.tsx #  Onboarding 2/2 : configuration
│   ├── Settings.tsx               #   Parametres (onglets profil/configuration)
│   └── UserConfiguration.tsx      #   Configuration utilisateur
│
├── types/                         # Definitions TypeScript
│   ├── index.ts                   #   PaginatedResponse, JSendSuccess/Fail/Error
│   ├── auth.ts                    #   User, UserConfiguration, LoginRequest, RegisterRequest
│   ├── client.ts                  #   Client, Address, AddressType, ClientInput, AddressInput
│   ├── quote.ts                   #   Quote, QuoteLine, QuoteStatus, QuoteInput
│   ├── invoice.ts                 #   Invoice, InvoiceLine, InvoiceStatus, InvoiceInput
│   └── service.ts                 #   Service, ServiceUnit, VatRate, ServiceInput
│
├── utils/                         # Utilitaires
│   ├── mappers.ts                 #   formatDateFR, clientToRow, quoteToRow, invoiceToRow
│   └── date.ts                    #   addDays (ajout de jours a une date)
│
├── test/                          # Infrastructure de tests
│   ├── setup.ts                   #   Setup global (jest-dom, MSW, cleanup)
│   ├── helpers.tsx                #   renderWithProviders (wrapper avec Router + Auth)
│   └── mocks/
│       ├── handlers.ts            #   Fixtures + handlers MSW pour toutes les routes API
│       └── server.ts              #   Serveur MSW pour les tests
│
├── App.tsx                        # Composant racine (AuthProvider + Routes)
├── App.css                        # Design system Tailwind (couleurs, typo)
├── main.tsx                       # Point d'entree (createRoot + BrowserRouter)
└── vite-env.d.ts                  # Types Vite
```

---

## Systeme de routing

L'application utilise React Router v7 avec deux groupes de routes protegees par des guards.

### Routes publiques (GuestRoute)

Accessible uniquement aux utilisateurs **non connectes**. Si un utilisateur authentifie accede a ces routes, il est redirige vers `/`.

| Route                  | Page                      | Description                             |
| ---------------------- | ------------------------- | --------------------------------------- |
| `/login`               | Login                     | Formulaire de connexion                 |
| `/register`            | Register                  | Formulaire d'inscription                |
| `/onboarding`          | Onboarding                | Etape 1 : informations entreprise       |
| `/user-configuration`  | OnboardingConfiguration   | Etape 2 : configuration metier          |

### Routes protegees (ProtectedRoute)

Accessible uniquement aux utilisateurs **connectes**. Si un utilisateur non authentifie accede a ces routes, il est redirige vers `/login`.

| Route            | Page             | Layout          | Description                          |
| ---------------- | ---------------- | --------------- | ------------------------------------ |
| `/`              | Dashboard        | MainLayout      | Tableau de bord avec stats et graphiques |
| `/devis`         | Quotes           | MainLayout      | Liste des devis avec recherche/pagination |
| `/devis/:id`     | DevisDetails     | DetailsLayout   | Detail d'un devis avec actions       |
| `/factures`      | Invoices         | MainLayout      | Liste des factures avec recherche/pagination |
| `/factures/:id`  | FactureDetails   | DetailsLayout   | Detail d'une facture avec actions    |
| `/clients`       | Clients          | MainLayout      | Liste des clients avec recherche/pagination |
| `/clients/:id`   | ClientDetails    | DetailsLayout   | Detail d'un client avec documents lies |
| `/settings`      | Settings         | MainLayout      | Parametres profil et configuration   |

---

## Couche API

### Instance Axios (`api/api.ts`)

L'application utilise une instance Axios configuree avec :

- **Base URL** : `import.meta.env.VITE_API_BASE_URL` (defaut : `http://localhost:8001/api`)
- **Content-Type** : `application/json`
- **Intercepteur de requete** : injecte automatiquement le header `Authorization: Bearer <token>` si un access token existe dans le localStorage
- **Intercepteur de reponse** : gere le rafraichissement automatique du token sur erreur 401

### Gestion des tokens JWT

```
localStorage
├── access_token    # Token d'acces (courte duree)
└── refresh_token   # Token de rafraichissement (longue duree)
```

**Flux de rafraichissement automatique :**

1. Une requete recoit une reponse 401
2. L'intercepteur verifie que ce n'est pas `/auth/login/` ou `/auth/token/refresh/` (pour eviter les boucles)
3. Si un rafraichissement est deja en cours, la requete est mise en file d'attente (`failedQueue`)
4. Sinon, un appel a `/auth/token/refresh/` est effectue
5. Les nouveaux tokens sont stockes et toutes les requetes en attente sont rejouees
6. Si le rafraichissement echoue, les tokens sont supprimes et l'utilisateur est redirige vers `/login`

### Format de reponse JSend

L'API utilise le format JSend pour toutes les reponses :

```typescript
// Succes (200/201)
{ status: "success", data: { ... } }

// Erreur de validation (400)
{ status: "fail", data: { email: ["Ce champ est requis."], password: ["Trop court."] } }

// Erreur serveur (500)
{ status: "error", message: "Erreur interne du serveur" }
```

### Gestion des erreurs de formulaire (`handleFormErrors`)

L'utilitaire `handleFormErrors<T>()` fait le pont entre les reponses JSend et React Hook Form :

- **Erreur 400 (fail)** : chaque champ en erreur est mappe vers `setError(field, { type: "server", message })` → retourne `null`
- **Erreur 500 (error)** : retourne le message global pour affichage en haut du formulaire
- **Erreur non-Axios** : retourne "Une erreur inattendue est survenue."

### Endpoints API

#### Authentification (`api/auth.ts`)

| Methode | Endpoint                   | Fonction           | Description                  |
| ------- | -------------------------- | ------------------ | ---------------------------- |
| POST    | `/auth/login/`             | `login()`          | Connexion + stockage tokens  |
| POST    | `/auth/register/`          | `register()`       | Inscription                  |
| POST    | `/auth/logout/`            | `logout()`         | Deconnexion + suppression tokens |
| POST    | `/auth/token/refresh/`     | `refreshToken()`   | Rafraichir le JWT            |
| GET     | `/auth/me/`                | `getCurrentUser()`| User + Configuration         |
| GET     | `/auth/profile/`           | `getProfile()`     | Profil utilisateur           |
| PATCH   | `/auth/profile/`           | `updateProfile()`  | Mise a jour profil           |
| GET     | `/auth/configuration/`     | `getConfiguration()` | Configuration metier       |
| PATCH   | `/auth/configuration/`     | `updateConfiguration()` | Mise a jour configuration |

#### Clients (`api/clients.ts`)

| Methode | Endpoint            | Fonction           | Description               |
| ------- | ------------------- | ------------------ | ------------------------- |
| GET     | `/clients/`         | `getClients()`     | Liste paginee + filtres   |
| GET     | `/clients/:id/`     | `getClient()`      | Detail d'un client        |
| POST    | `/clients/`         | `createClient()`   | Creation                  |
| PATCH   | `/clients/:id/`     | `updateClient()`   | Mise a jour partielle     |
| DELETE  | `/clients/:id/`     | `deleteClient()`   | Suppression               |
| GET     | `/adresses/`        | `getAddresses()`   | Liste des adresses        |
| POST    | `/adresses/`        | `createAddress()`  | Ajout d'adresse           |
| PATCH   | `/adresses/:id/`    | `updateAddress()`  | Modification d'adresse    |
| DELETE  | `/adresses/:id/`    | `deleteAddress()`  | Suppression d'adresse     |

#### Devis (`api/quotes.ts`)

| Methode | Endpoint                       | Fonction              | Description                |
| ------- | ------------------------------ | --------------------- | -------------------------- |
| GET     | `/quotes/`                     | `getQuotes()`         | Liste paginee + filtres    |
| GET     | `/quotes/:id/`                 | `getQuote()`          | Detail d'un devis          |
| POST    | `/quotes/`                     | `createQuote()`       | Creation                   |
| PATCH   | `/quotes/:id/`                 | `updateQuote()`       | Mise a jour partielle      |
| DELETE  | `/quotes/:id/`                 | `deleteQuote()`       | Suppression                |
| POST    | `/quotes/:id/changer_statut/`  | `changeQuoteStatus()` | Changement de statut       |
| GET     | `/quotes/:id/pdf/`             | `downloadQuotePdf()`  | Telecharger le PDF         |

#### Factures (`api/invoices.ts`)

| Methode | Endpoint                         | Fonction                  | Description                 |
| ------- | -------------------------------- | ------------------------- | --------------------------- |
| GET     | `/invoices/`                     | `getInvoices()`           | Liste paginee + filtres     |
| GET     | `/invoices/:id/`                 | `getInvoice()`            | Detail d'une facture        |
| POST    | `/invoices/`                     | `createInvoice()`         | Creation                    |
| PATCH   | `/invoices/:id/`                 | `updateInvoice()`         | Mise a jour partielle       |
| DELETE  | `/invoices/:id/`                 | `deleteInvoice()`         | Suppression                 |
| POST    | `/invoices/:id/changer_statut/`  | `changeInvoiceStatus()`   | Changement de statut        |
| POST    | `/invoices/from-devis/`          | `createInvoiceFromQuote()` | Creer facture depuis devis |
| GET     | `/invoices/:id/pdf/`             | `downloadInvoicePdf()`    | Telecharger le PDF          |

#### Services (`api/services.ts`)

| Methode | Endpoint           | Fonction          | Description               |
| ------- | ------------------ | ----------------- | ------------------------- |
| GET     | `/services/`       | `getServices()`   | Liste paginee             |
| GET     | `/services/:id/`   | `getService()`    | Detail d'un service       |
| POST    | `/services/`       | `createService()` | Creation                  |
| PATCH   | `/services/:id/`   | `updateService()` | Mise a jour partielle     |
| DELETE  | `/services/:id/`   | `deleteService()` | Suppression               |

---

## Gestion de l'etat

L'application n'utilise **pas de store global** (Redux, Zustand). L'etat est gere par :

### 1. Contexte d'authentification (`useAuth`)

Le `AuthProvider` encapsule toute l'application et expose via `useAuth()` :

| Propriete        | Type                    | Description                               |
| ---------------- | ----------------------- | ----------------------------------------- |
| `user`           | `User \| null`          | Utilisateur connecte                      |
| `configuration`  | `UserConfiguration \| null` | Configuration metier de l'utilisateur |
| `isAuthenticated`| `boolean`               | Statut de connexion                       |
| `isLoading`      | `boolean`               | Chargement initial en cours               |
| `login()`        | `(data) => Promise`     | Connexion et chargement du user           |
| `logout()`       | `() => Promise`         | Deconnexion et nettoyage                  |
| `refreshUser()`  | `() => Promise`         | Recharge user/config depuis l'API         |

**Flux d'initialisation :**

1. Au montage, `AuthProvider` verifie si un `access_token` existe dans le localStorage
2. Si oui, appel a `getCurrentUser()` pour charger les donnees utilisateur
3. Si l'appel echoue (token invalide), les tokens sont supprimes et `isAuthenticated = false`
4. Si pas de token, `isLoading` passe directement a `false`

### 2. Hooks de donnees (`useClients`, `useQuotes`, `useInvoices`)

Ces hooks suivent le meme pattern :

```typescript
const { data, rows, count, isLoading, error, refresh } = useHook(filters);
```

| Propriete   | Description                                              |
| ----------- | -------------------------------------------------------- |
| `data`      | Donnees brutes de l'API (Client[], Quote[], Invoice[])   |
| `rows`      | Donnees transformees pour les tableaux (via mappers)     |
| `count`     | Nombre total d'elements (pour la pagination)             |
| `isLoading` | Indicateur de chargement                                 |
| `error`     | Message d'erreur ou null                                 |
| `refresh()` | Force un rechargement des donnees                        |

**Particularites :**

- `useQuotes` et `useInvoices` ne chargent pas si `filters === undefined` (chargement conditionnel)
- La recherche est debouncee via `useDebouncedValue` (300ms par defaut)
- La pagination est de 20 elements par page (constante `PAGE_SIZE`)
- Le pattern de nettoyage (`let cancelled = true` dans le cleanup de useEffect) evite les mises a jour sur un composant demonte

### 3. Etat local des pages

Chaque page gere son etat local via `useState` :

- Recherche (`search`)
- Page courante (`page`)
- Etats des modales (`isCreateModalOpen`, `isStatusModalOpen`, etc.)
- Selection d'elements pour suppression ou edition

---

## Systeme de layouts

L'application utilise trois layouts principaux :

### MainLayout

Utilise pour les pages de listes (Dashboard, Clients, Devis, Factures, Settings).

```
┌──────────────────────────────────────────┐
│ MobileHeader (visible < md)              │
├──────────┬───────────────────────────────┤
│          │                               │
│ Sidebar  │          main                 │
│ (268px)  │     (flex-1, overflow-auto)   │
│          │                               │
│          │     {children}                │
│          │                               │
├──────────┤                               │
│ Profile  │                               │
│ Logout   │                               │
└──────────┴───────────────────────────────┘
```

### DetailsLayout

Utilise pour les pages de details (ClientDetails, DevisDetails, FactureDetails).

```
┌──────────────────────────────────────────┐
│ MobileHeader (visible < md)              │
├──────────┬───────────────────────────────┤
│          │ HeaderDetails                 │
│ Sidebar  │ [Retour] [Titre] [Actions]   │
│ (268px)  ├───────────────────────────────┤
│          │                               │
│          │          main                 │
│          │     {children}                │
│          │                               │
└──────────┴───────────────────────────────┘
```

### AuthLayout

Utilise pour les pages d'authentification et d'onboarding.

```
┌──────────────────────────────────────────┐
│                                          │
│              [Logo]                      │
│                                          │
│           {children}                     │
│        (max-w-md, centre)                │
│                                          │
└──────────────────────────────────────────┘
```

### Sidebar

La sidebar est composee de :

- **SidebarItem** : element de navigation simple (Dashboard, Clients, Settings)
- **SidebarItemGroup** : groupe depliable (Devis et Factures sous "Devis Et Factures")
- **SidebarProfile** : nom et email de l'utilisateur connecte
- **Bouton Deconnexion** : en bas de la sidebar

En mobile, la sidebar est un drawer overlay qui s'ouvre via le bouton hamburger du `MobileHeader`.

---

## Formulaires

Tous les formulaires utilisent **React Hook Form** avec le pattern suivant :

```typescript
const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<T>();

const onSubmit = async (data: T) => {
  try {
    await apiCall(data);
  } catch (error) {
    const message = handleFormErrors<T>(error, setError);
    if (message) setGlobalError(message);
  }
};
```

### Formulaires avec lignes dynamiques (Devis/Factures)

Les formulaires d'edition de devis et factures utilisent `useFieldArray` pour gerer les lignes de prestation :

```typescript
const { fields, append, remove } = useFieldArray({ control, name: "lignes" });
```

Chaque ligne contient : libelle, description, quantite, prix unitaire HT, taux TVA. Les totaux (HT, TVA, TTC) sont calcules automatiquement via `watch()`.

### Validation

| Champ          | Regles                                |
| -------------- | ------------------------------------- |
| Email          | Pattern `^[^@]+@[^@]+\.[^@]+$`       |
| Mot de passe   | Minimum 8 caracteres                  |
| Telephone      | 10 a 15 chiffres                      |
| Code postal    | Exactement 5 chiffres                 |
| Ville          | Lettres, espaces, accents, tirets     |
| SIRET          | Exactement 14 chiffres                |

### Modales de formulaire

Les formulaires sont affiches dans des `Modal` accessibles qui supportent :

- Fermeture par Escape, clic overlay, ou bouton X
- Focus trap (navigation Tab/Shift+Tab)
- Restauration du focus precedent a la fermeture
- Soumission via `form.requestSubmit()` depuis le bouton de la modale

---

## Modeles de donnees

### User

```typescript
interface User {
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
```

### UserConfiguration

```typescript
interface UserConfiguration {
  next_quote_number: number;       // Prochain numero de devis
  next_invoice_number: number;     // Prochain numero de facture
  quote_prefix: string;            // Prefixe devis (ex: "DEV")
  invoice_prefix: string;          // Prefixe facture (ex: "FAC")
  payment_deadline_days: number;   // Delai de paiement en jours
  quote_validity_days: number;     // Duree de validite devis en jours
}
```

### Client

```typescript
interface Client {
  id: number;
  raison_sociale: string;       // Nom de l'entreprise
  siret: string;
  email: string;
  telephone: string;
  contact_nom: string;           // Nom du contact principal
  contact_email: string;
  contact_telephone: string;
  notes: string;
  adresses: Address[];           // Adresses du client
  created_at: string;
  updated_at: string;
}

type AddressType = "SIEGE" | "FACTURATION" | "LIVRAISON";

interface Address {
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
```

### Quote (Devis)

```typescript
type QuoteStatus = "BROUILLON" | "ENVOYE" | "ACCEPTE" | "REFUSE" | "EXPIRE";

interface Quote {
  id: number;
  utilisateur: number;
  client: Client;
  numero: string;             // Ex: "DEV-005"
  date_emission: string;      // Format ISO (YYYY-MM-DD)
  date_validite: string;
  statut: QuoteStatus;
  objet: string;
  notes: string;
  total_ht: string;           // Valeurs decimales en string
  total_tva: string;
  total_ttc: string;
  lignes: QuoteLine[];
  historique: QuoteHistory[];
  created_at: string;
  updated_at: string;
}
```

### Invoice (Facture)

```typescript
type InvoiceStatus = "BROUILLON" | "ENVOYEE" | "PAYEE" | "EN_RETARD";

interface Invoice {
  id: number;
  utilisateur: number;
  client: Client;
  devis_origine: number | null;   // ID du devis source (si cree depuis un devis)
  numero: string;                  // Ex: "FAC-003"
  date_emission: string;
  date_echeance: string;           // Date limite de paiement
  statut: InvoiceStatus;
  objet: string;
  notes: string;
  total_ht: string;
  total_tva: string;
  total_ttc: string;
  lignes: InvoiceLine[];
  historique: InvoiceHistory[];
  created_at: string;
  updated_at: string;
}
```

### Transitions de statut

**Devis :** Toutes les transitions sont possibles (le formulaire exclut simplement le statut actuel).

**Factures :** Transitions restreintes avec regles metier :

```
BROUILLON  → ENVOYEE
ENVOYEE    → PAYEE, EN_RETARD
EN_RETARD  → PAYEE
PAYEE      → (aucune transition possible)
```

### Service (Prestation)

```typescript
type ServiceUnit = "heure" | "jour" | "forfait";
type VatRate = "20.00" | "10.00" | "5.50" | "0.00";

interface Service {
  id: number;
  label: string;
  description: string;
  unit_price_excl_tax: string;
  unit: ServiceUnit;
  taux_tva: VatRate;
  created_at: string;
  updated_at: string;
}
```

---

## Design system

### Couleurs

Definies dans `App.css` via les variables de theme Tailwind :

| Token                  | Hex       | Usage                                  |
| ---------------------- | --------- | -------------------------------------- |
| `primary-700`          | `#0F363E` | Hover sidebar, backgrounds sombres    |
| `primary-500`          | `#144A54` | Couleur principale, sidebar, boutons   |
| `primary-300`          | `#227D8D` | Liens, accents, etats actifs           |
| `text-black`           | `#000000` | Texte principal                        |
| `text-white`           | `#FFFFFF` | Texte sur fond sombre                  |
| `text-placeholder`     | `#9CA3AF` | Placeholders, bordures, separateurs    |
| `alert`                | `#B52A22` | Erreurs, statuts Refuse/Expire/En retard |
| `success`              | `#1D6D31` | Statuts Accepte/Payee                  |
| `pending`              | `#E8BA00` | Statuts Envoye/Envoyee (en attente)    |
| `bg-primary`           | `#F3F4F6` | Fond de page principal                 |

### Typographie

| Token          | Taille | Line-height | Poids | Usage                    |
| -------------- | ------ | ----------- | ----- | ------------------------ |
| `caption`      | 13px   | 20px        | -     | Texte secondaire, labels |
| `medium-bold`  | 16px   | 24px        | 700   | Titres de sections       |
| `small-medium` | 12px   | 18px        | 500   | Badges, metadata         |

Police : **Inter Variable** (chargee via `@fontsource-variable/inter`).

### Responsive

L'application suit une approche **mobile-first** avec le breakpoint `md` (768px) :

- **Mobile** : sidebar en drawer overlay, header hamburger, tableaux 3 colonnes, formulaires empiles
- **Desktop** : sidebar fixe, tableaux 5-7 colonnes, formulaires en grille

---

## Tests

### Configuration

- **Runner** : Vitest 4 (integre a Vite)
- **Environnement** : jsdom
- **Setup** : `src/test/setup.ts` (jest-dom matchers, MSW server lifecycle, cleanup)
- **Mocks API** : MSW (Mock Service Worker) avec handlers pour tous les endpoints

### Scripts

| Commande               | Description                           |
| ---------------------- | ------------------------------------- |
| `npm test`             | Lance tous les tests une fois         |
| `npm run test:watch`   | Mode watch interactif                 |
| `npm run test:coverage`| Tests + rapport de couverture (v8)    |

### Organisation des tests

```
src/
├── utils/__tests__/
│   ├── mappers.test.ts          # formatDateFR, clientToRow, quoteToRow, invoiceToRow
│   └── date.test.ts             # addDays
├── api/__tests__/
│   ├── handleFormErrors.test.ts # Mapping JSend → React Hook Form
│   ├── auth.test.ts             # login, register, logout, getCurrentUser, profile
│   ├── clients.test.ts          # CRUD clients + adresses
│   ├── quotes.test.ts           # CRUD devis + changement statut
│   ├── invoices.test.ts         # CRUD factures + creation depuis devis
│   └── services.test.ts         # CRUD services
├── hooks/__tests__/
│   ├── useAuth.test.tsx         # Contexte auth, login/logout, gestion erreurs
│   ├── useClients.test.ts       # Chargement, rows, refresh, erreurs
│   ├── useQuotes.test.ts        # Chargement conditionnel, filtres
│   ├── useInvoices.test.ts      # Chargement conditionnel, filtres
│   └── useDebouncedValue.test.ts # Debounce, annulation, delai
├── components/__tests__/
│   ├── ProtectedRoute.test.tsx  # Redirection si non authentifie
│   └── GuestRoute.test.tsx      # Redirection si authentifie
├── components/ui/__tests__/
│   ├── Button.test.tsx          # Variantes, props, click, disabled
│   ├── Modal.test.tsx           # Ouverture/fermeture, Escape, overlay
│   ├── SearchBar.test.tsx       # Placeholder, onChange
│   ├── Pagination.test.tsx      # Navigation, ellipses, disabled
│   └── StatusBadge.test.tsx     # Tous statuts, tailles, couleurs
└── components/forms/__tests__/
    └── LoginForm.test.tsx       # Validation client/serveur, toggle password
```

### Infrastructure de test

- **Fixtures** : `src/test/mocks/handlers.ts` contient les donnees de test et les handlers MSW pour tous les endpoints
- **Helpers** : `src/test/helpers.tsx` fournit `renderWithProviders()` qui encapsule les composants dans `MemoryRouter` + `AuthProvider`
- **Override de handlers** : les tests peuvent surcharger des handlers specifiques via `server.use()` pour simuler des erreurs

---

## Parcours utilisateur

### 1. Inscription et onboarding

```
/register → /onboarding → /user-configuration → /login
```

1. L'utilisateur cree un compte (email, nom, mot de passe)
2. Il complete son profil entreprise (nom commercial, SIRET, adresse)
3. Il configure ses parametres metier (prefixes, numeros, delais)
4. Il se connecte avec ses identifiants

### 2. Gestion des clients

Depuis `/clients`, l'utilisateur peut :

- Rechercher un client (recherche debouncee)
- Creer un client via modale (infos entreprise + contact + adresse siege)
- Visualiser les details d'un client (`/clients/:id`)
- Supprimer un client via modale de confirmation
- Voir les devis et factures lies au client dans la page de details

### 3. Cycle de vie d'un devis

```
Brouillon → Envoye → Accepte → [Conversion en facture]
                   → Refuse
                   → Expire
```

Depuis `/devis`, l'utilisateur peut :

- Creer un devis (selection client, lignes de prestation dynamiques)
- Modifier le statut d'un devis
- Convertir un devis accepte en facture (bouton dans DevisDetails)
- Telecharger le PDF

### 4. Cycle de vie d'une facture

```
Brouillon → Envoyee → Payee
                    → En retard → Payee
```

Depuis `/factures`, l'utilisateur peut :

- Creer une facture (manuellement ou depuis un devis)
- Modifier le statut selon les transitions autorisees
- Telecharger/envoyer le PDF
- Les factures payees ne peuvent plus changer de statut

### 5. Dashboard

Le tableau de bord (`/`) affiche :

- **Benefice du mois** : total TTC des factures payees du mois en cours
- **Entrees en attente** : total TTC des devis acceptes + factures envoyees/en retard
- **Graphique** : revenus par mois de l'annee en cours (Recharts LineChart)
- **Deadlines a venir** : factures envoyees/en retard + devis envoyes, tries par date
- **Dernieres transactions** : 10 dernieres factures payees

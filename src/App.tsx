import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Quotes from './pages/Quotes'
import Invoices from './pages/Invoices'
import Clients from './pages/Clients'
import DevisDetails from './pages/DevisDetails'
import FactureDetails from './pages/FactureDetails'
import ClientDetails from './pages/ClientDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import OnboardingConfiguration from './pages/OnboardingConfiguration'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/user-configuration" element={<OnboardingConfiguration />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devis" element={<Quotes />} />
          <Route path="/devis/:id" element={<DevisDetails />} />
          <Route path="/factures" element={<Invoices />} />
          <Route path="/factures/:id" element={<FactureDetails />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

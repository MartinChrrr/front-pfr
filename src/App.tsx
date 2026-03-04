import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Quotes from './pages/Quotes'
import Invoices from './pages/Invoices'
import Clients from './pages/Clients'
import DevisDetails from './pages/DevisDetails'
import FactureDetails from './pages/FactureDetails'
import ClientDetails from './pages/ClientDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/devis" element={<Quotes />} />
      <Route path="/devis/:id" element={<DevisDetails />} />
      <Route path="/factures" element={<Invoices />} />
      <Route path="/factures/:id" element={<FactureDetails />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<ClientDetails />} />
    </Routes>
  )
}

export default App

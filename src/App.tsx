import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Quotes from './pages/Quotes'
import Invoices from './pages/Invoices'
import Clients from './pages/Clients'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/devis" element={<Quotes />} />
      <Route path="/factures" element={<Invoices />} />
      <Route path="/clients" element={<Clients />} />
    </Routes>
  )
}

export default App

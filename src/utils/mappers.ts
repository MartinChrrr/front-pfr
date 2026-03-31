import type { Client } from "../types/client";
import type { Quote } from "../types/quote";
import type { Invoice } from "../types/invoice";
import type { ClientRowData } from "../components/ui/table/ClientRow";
import type { DevisRowData } from "../components/ui/table/DevisRow";
import type { FactureRowData } from "../components/ui/table/FactureRow";

export function formatDateFR(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

export function clientToRow(client: Client): ClientRowData {
  return {
    id: client.id,
    contact_name: client.contact_nom,
    company_name: client.raison_sociale,
    email: client.email,
    phone: client.telephone,
  };
}

export function quoteToRow(quote: Quote): DevisRowData {
  return {
    id: quote.id,
    number: quote.numero,
    date: formatDateFR(quote.date_emission),
    client: quote.client.raison_sociale,
    echeance: formatDateFR(quote.date_validite),
    status: quote.statut,
    ttc: parseFloat(quote.total_ttc),
  };
}

export function invoiceToRow(invoice: Invoice): FactureRowData {
  return {
    id: invoice.id,
    number: invoice.numero,
    date: formatDateFR(invoice.date_emission),
    client: invoice.client.raison_sociale,
    echeance: formatDateFR(invoice.date_echeance),
    status: invoice.statut,
    ttc: parseFloat(invoice.total_ttc),
  };
}

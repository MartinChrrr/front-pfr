import { describe, it, expect } from "vitest";
import { formatDateFR, clientToRow, quoteToRow, invoiceToRow } from "../mappers";
import { mockClient, mockQuote, mockInvoice } from "../../test/mocks/handlers";

describe("formatDateFR", () => {
  it("convertit une date ISO en format FR (dd/mm/yyyy)", () => {
    expect(formatDateFR("2025-03-15")).toBe("15/03/2025");
  });

  it("gere le premier jour du mois", () => {
    expect(formatDateFR("2025-01-01")).toBe("01/01/2025");
  });

  it("gere le dernier jour de l'annee", () => {
    expect(formatDateFR("2025-12-31")).toBe("31/12/2025");
  });
});

describe("clientToRow", () => {
  it("mappe un Client vers ClientRowData", () => {
    const row = clientToRow(mockClient);

    expect(row).toEqual({
      id: mockClient.id,
      contact_name: mockClient.contact_nom,
      company_name: mockClient.raison_sociale,
      email: mockClient.email,
      phone: mockClient.telephone,
    });
  });
});

describe("quoteToRow", () => {
  it("mappe un Quote vers DevisRowData", () => {
    const row = quoteToRow(mockQuote);

    expect(row).toEqual({
      id: mockQuote.id,
      number: mockQuote.numero,
      date: "01/03/2025",
      client: mockQuote.client.raison_sociale,
      echeance: "31/03/2025",
      status: mockQuote.statut,
      ttc: 1200,
    });
  });
});

describe("invoiceToRow", () => {
  it("mappe une Invoice vers FactureRowData", () => {
    const row = invoiceToRow(mockInvoice);

    expect(row).toEqual({
      id: mockInvoice.id,
      number: mockInvoice.numero,
      date: "15/03/2025",
      client: mockInvoice.client.raison_sociale,
      echeance: "14/04/2025",
      status: mockInvoice.statut,
      ttc: 1200,
    });
  });
});

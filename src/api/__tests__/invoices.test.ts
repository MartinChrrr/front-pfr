import { describe, it, expect, beforeEach } from "vitest";
import { mockInvoice } from "../../test/mocks/handlers";
import {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  changeInvoiceStatus,
  createInvoiceFromQuote,
} from "../invoices";

describe("invoices API", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  describe("getInvoices", () => {
    it("retourne une liste paginee de factures", async () => {
      const result = await getInvoices();

      expect(result.count).toBe(1);
      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toEqual(mockInvoice);
    });

    it("accepte des filtres", async () => {
      const result = await getInvoices({ statut: "BROUILLON", search: "facture" });

      expect(result.results).toHaveLength(1);
    });
  });

  describe("getInvoice", () => {
    it("retourne une facture par son id", async () => {
      const result = await getInvoice(1);

      expect(result).toEqual(mockInvoice);
    });
  });

  describe("createInvoice", () => {
    it("cree une facture et retourne le resultat", async () => {
      const result = await createInvoice({
        client_id: 1,
        lignes: [
          { libelle: "Conseil", quantite: "10", prix_unitaire_ht: "100.00", taux_tva: "20.00" },
        ],
      });

      expect(result).toEqual(mockInvoice);
    });
  });

  describe("updateInvoice", () => {
    it("met a jour une facture", async () => {
      const result = await updateInvoice(1, { objet: "Modifie" });

      expect(result).toEqual(mockInvoice);
    });
  });

  describe("deleteInvoice", () => {
    it("supprime une facture sans erreur", async () => {
      await expect(deleteInvoice(1)).resolves.toBeUndefined();
    });
  });

  describe("changeInvoiceStatus", () => {
    it("change le statut d'une facture", async () => {
      const result = await changeInvoiceStatus(1, "ENVOYEE");

      expect(result.statut).toBe("ENVOYEE");
    });
  });

  describe("createInvoiceFromQuote", () => {
    it("cree une facture depuis un devis", async () => {
      const result = await createInvoiceFromQuote(1);

      expect(result).toEqual(mockInvoice);
    });
  });
});

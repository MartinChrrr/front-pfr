import { describe, it, expect, beforeEach } from "vitest";
import { mockQuote } from "../../test/mocks/handlers";
import {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  changeQuoteStatus,
} from "../quotes";

describe("quotes API", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  describe("getQuotes", () => {
    it("retourne une liste paginee de devis", async () => {
      const result = await getQuotes();

      expect(result.count).toBe(1);
      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toEqual(mockQuote);
    });

    it("accepte des filtres (statut, client_id, search)", async () => {
      const result = await getQuotes({ statut: "BROUILLON", search: "conseil" });

      expect(result.results).toHaveLength(1);
    });
  });

  describe("getQuote", () => {
    it("retourne un devis par son id", async () => {
      const result = await getQuote(1);

      expect(result).toEqual(mockQuote);
    });
  });

  describe("createQuote", () => {
    it("cree un devis et retourne le resultat", async () => {
      const result = await createQuote({
        client_id: 1,
        lignes: [
          { libelle: "Conseil", quantite: "10", prix_unitaire_ht: "100.00", taux_tva: "20.00" },
        ],
      });

      expect(result).toEqual(mockQuote);
    });
  });

  describe("updateQuote", () => {
    it("met a jour un devis", async () => {
      const result = await updateQuote(1, { objet: "Modifie" });

      expect(result).toEqual(mockQuote);
    });
  });

  describe("deleteQuote", () => {
    it("supprime un devis sans erreur", async () => {
      await expect(deleteQuote(1)).resolves.toBeUndefined();
    });
  });

  describe("changeQuoteStatus", () => {
    it("change le statut d'un devis", async () => {
      const result = await changeQuoteStatus(1, "ENVOYE");

      expect(result.statut).toBe("ENVOYE");
    });
  });
});

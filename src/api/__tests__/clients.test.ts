import { describe, it, expect, beforeEach } from "vitest";
import { mockClient } from "../../test/mocks/handlers";
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../clients";

describe("clients API", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  describe("getClients", () => {
    it("retourne une liste paginee de clients", async () => {
      const result = await getClients();

      expect(result.count).toBe(1);
      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toEqual(mockClient);
    });

    it("accepte des parametres de filtrage", async () => {
      const result = await getClients({ search: "Client", page: 1 });

      expect(result.results).toHaveLength(1);
    });
  });

  describe("getClient", () => {
    it("retourne un client par son id", async () => {
      const result = await getClient(1);

      expect(result).toEqual(mockClient);
    });
  });

  describe("createClient", () => {
    it("cree un client et retourne le resultat", async () => {
      const result = await createClient({ raison_sociale: "Nouveau Client" });

      expect(result).toEqual(mockClient);
    });
  });

  describe("updateClient", () => {
    it("met a jour un client et retourne le resultat", async () => {
      const result = await updateClient(1, { raison_sociale: "Client modifie" });

      expect(result).toEqual(mockClient);
    });
  });

  describe("deleteClient", () => {
    it("supprime un client sans erreur", async () => {
      await expect(deleteClient(1)).resolves.toBeUndefined();
    });
  });

  describe("addresses", () => {
    it("cree une adresse", async () => {
      const result = await createAddress({
        client_id: 1,
        type: "SIEGE",
        ligne1: "10 rue neuve",
        code_postal: "75001",
        ville: "Paris",
      });

      expect(result.id).toBeDefined();
    });

    it("met a jour une adresse", async () => {
      const result = await updateAddress(1, { ligne1: "20 rue modifiee" });

      expect(result.id).toBeDefined();
    });

    it("supprime une adresse sans erreur", async () => {
      await expect(deleteAddress(1)).resolves.toBeUndefined();
    });
  });
});

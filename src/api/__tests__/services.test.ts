import { describe, it, expect, beforeEach } from "vitest";
import { mockService } from "../../test/mocks/handlers";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../services";

describe("services API", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  describe("getServices", () => {
    it("retourne une liste paginee de services", async () => {
      const result = await getServices();

      expect(result.count).toBe(1);
      expect(result.results).toHaveLength(1);
      expect(result.results[0]).toEqual(mockService);
    });
  });

  describe("getService", () => {
    it("retourne un service par son id", async () => {
      const result = await getService(1);

      expect(result).toEqual(mockService);
    });
  });

  describe("createService", () => {
    it("cree un service", async () => {
      const result = await createService({
        label: "Nouveau",
        unit_price_excl_tax: "50.00",
      });

      expect(result).toEqual(mockService);
    });
  });

  describe("updateService", () => {
    it("met a jour un service", async () => {
      const result = await updateService(1, { label: "Modifie" });

      expect(result).toEqual(mockService);
    });
  });

  describe("deleteService", () => {
    it("supprime un service sans erreur", async () => {
      await expect(deleteService(1)).resolves.toBeUndefined();
    });
  });
});

import { describe, it, expect } from "vitest";
import { addDays } from "../date";

describe("addDays", () => {
  it("ajoute des jours a une date", () => {
    expect(addDays("2025-03-01", 30)).toBe("2025-03-31");
  });

  it("gere le passage de mois", () => {
    expect(addDays("2025-01-31", 1)).toBe("2025-02-01");
  });

  it("gere le passage d'annee", () => {
    expect(addDays("2025-12-31", 1)).toBe("2026-01-01");
  });

  it("gere zero jours", () => {
    expect(addDays("2025-06-15", 0)).toBe("2025-06-15");
  });

  it("gere les jours negatifs", () => {
    expect(addDays("2025-03-15", -10)).toBe("2025-03-05");
  });

  it("gere les annees bissextiles", () => {
    expect(addDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addDays("2025-02-28", 1)).toBe("2025-03-01");
  });
});

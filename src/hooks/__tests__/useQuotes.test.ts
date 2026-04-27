import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useQuotes } from "../useQuotes";
import { mockQuote } from "../../test/mocks/handlers";

describe("useQuotes", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  it("ne charge pas si les filtres sont undefined", async () => {
    const { result } = renderHook(() => useQuotes(undefined));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.quotes).toHaveLength(0);
  });

  it("charge les devis quand des filtres sont fournis", async () => {
    const { result } = renderHook(() => useQuotes({}));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.quotes).toHaveLength(1);
    expect(result.current.quotes[0]).toEqual(mockQuote);
    expect(result.current.count).toBe(1);
  });

  it("transforme les devis en quoteRows", async () => {
    const { result } = renderHook(() => useQuotes({}));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.quoteRows).toHaveLength(1);
    expect(result.current.quoteRows[0].number).toBe(mockQuote.numero);
    expect(result.current.quoteRows[0].status).toBe(mockQuote.statut);
  });
});

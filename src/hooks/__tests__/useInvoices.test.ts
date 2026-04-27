import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useInvoices } from "../useInvoices";
import { mockInvoice } from "../../test/mocks/handlers";

describe("useInvoices", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  it("ne charge pas si les filtres sont undefined", async () => {
    const { result } = renderHook(() => useInvoices(undefined));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.invoices).toHaveLength(0);
  });

  it("charge les factures quand des filtres sont fournis", async () => {
    const { result } = renderHook(() => useInvoices({}));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.invoices).toHaveLength(1);
    expect(result.current.invoices[0]).toEqual(mockInvoice);
    expect(result.current.count).toBe(1);
  });

  it("transforme les factures en invoiceRows", async () => {
    const { result } = renderHook(() => useInvoices({}));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.invoiceRows).toHaveLength(1);
    expect(result.current.invoiceRows[0].number).toBe(mockInvoice.numero);
    expect(result.current.invoiceRows[0].status).toBe(mockInvoice.statut);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../../test/mocks/server";
import { useClients } from "../useClients";
import { mockClient } from "../../test/mocks/handlers";

const BASE_URL = "http://localhost:8001/api";

describe("useClients", () => {
  beforeEach(() => {
    localStorage.setItem("access_token", "token");
  });

  it("charge les clients au montage", async () => {
    const { result } = renderHook(() => useClients());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toHaveLength(1);
    expect(result.current.clients[0]).toEqual(mockClient);
    expect(result.current.count).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it("transforme les clients en clientRows", async () => {
    const { result } = renderHook(() => useClients());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clientRows).toHaveLength(1);
    expect(result.current.clientRows[0]).toEqual({
      id: mockClient.id,
      contact_name: mockClient.contact_nom,
      company_name: mockClient.raison_sociale,
      email: mockClient.email,
      phone: mockClient.telephone,
    });
  });

  it("gere les erreurs de chargement", async () => {
    server.use(
      http.get(`${BASE_URL}/clients/`, () => {
        return HttpResponse.json({ detail: "Erreur" }, { status: 500 });
      })
    );

    const { result } = renderHook(() => useClients());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.clients).toHaveLength(0);
  });

  it("recharge les donnees quand refresh() est appele", async () => {
    let callCount = 0;
    server.use(
      http.get(`${BASE_URL}/clients/`, () => {
        callCount++;
        return HttpResponse.json({
          status: "success",
          data: { count: callCount, next: null, previous: null, results: [mockClient] },
        });
      })
    );

    const { result } = renderHook(() => useClients());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.count).toBe(1);

    act(() => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.count).toBe(2);
    });
  });
});

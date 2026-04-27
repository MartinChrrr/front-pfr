import api from "./api";
import type { PaginatedResponse } from "../types";
import type { Quote, QuoteInput, QuoteStatus } from "../types/quote";

export interface QuoteFilters {
  statut?: QuoteStatus;
  client_id?: number;
  search?: string;
  ordering?: string;
  page?: number;
}

export async function getQuotes(params?: QuoteFilters): Promise<PaginatedResponse<Quote>> {
  const response = await api.get("/quotes/", { params });
  return response.data.data;
}

export async function getQuote(id: number): Promise<Quote> {
  const response = await api.get(`/quotes/${id}/`);
  return response.data.data;
}

export async function createQuote(data: QuoteInput): Promise<Quote> {
  const response = await api.post("/quotes/", data);
  return response.data.data;
}

export async function updateQuote(id: number, data: Partial<QuoteInput>): Promise<Quote> {
  const response = await api.patch(`/quotes/${id}/`, data);
  return response.data.data;
}

export async function deleteQuote(id: number): Promise<void> {
  await api.delete(`/quotes/${id}/`);
}

export async function changeQuoteStatus(id: number, statut: QuoteStatus): Promise<Quote> {
  const response = await api.post(`/quotes/${id}/changer_statut/`, { statut });
  return response.data.data;
}

export async function downloadQuotePdf(id: number): Promise<void> {
  const response = await api.get(`/quotes/${id}/pdf/`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const contentDisposition = response.headers["content-disposition"];
  const filename = contentDisposition
    ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
    : `devis-${id}.pdf`;

  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

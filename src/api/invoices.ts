import api from "./api";
import type { PaginatedResponse } from "../types";
import type { Invoice, InvoiceInput, InvoiceStatus } from "../types/invoice";

export interface InvoiceFilters {
  client?: number;
  statut?: InvoiceStatus;
  devis_origine?: number;
  date_emission_after?: string;
  date_emission_before?: string;
  date_echeance_after?: string;
  date_echeance_before?: string;
  search?: string;
  ordering?: string;
  page?: number;
}

export async function getInvoices(params?: InvoiceFilters): Promise<PaginatedResponse<Invoice>> {
  const response = await api.get("/invoices/", { params });
  return response.data.data;
}

export async function getInvoice(id: number): Promise<Invoice> {
  const response = await api.get(`/invoices/${id}/`);
  return response.data.data;
}

export async function createInvoice(data: InvoiceInput): Promise<Invoice> {
  const response = await api.post("/invoices/", data);
  return response.data.data;
}

export async function updateInvoice(id: number, data: Partial<InvoiceInput>): Promise<Invoice> {
  const response = await api.patch(`/invoices/${id}/`, data);
  return response.data.data;
}

export async function deleteInvoice(id: number): Promise<void> {
  await api.delete(`/invoices/${id}/`);
}

export async function changeInvoiceStatus(id: number, statut: InvoiceStatus): Promise<Invoice> {
  const response = await api.post(`/invoices/${id}/changer_statut/`, { statut });
  return response.data.data;
}

export async function createInvoiceFromQuote(devis_id: number): Promise<Invoice> {
  const response = await api.post("/invoices/from-devis/", { devis_id });
  return response.data.data;
}

export async function downloadInvoicePdf(id: number): Promise<void> {
  const response = await api.get(`/invoices/${id}/pdf/`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const contentDisposition = response.headers["content-disposition"];
  const filename = contentDisposition
    ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
    : `facture-${id}.pdf`;

  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

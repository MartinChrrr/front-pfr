import api from './axios';
import type { Invoice, InvoiceCreatePayload, InvoiceStatus } from '../types/invoice';

export const invoicesApi = {
  getAll: (status?: InvoiceStatus) => {
    const params = status ? { status } : {};
    return api.get<Invoice[]>('/invoices/', { params }).then((res) => res.data);
  },

  getById: (id: number) =>
    api.get<Invoice>(`/invoices/${id}/`).then((res) => res.data),

  create: (data: InvoiceCreatePayload) =>
    api.post<Invoice>('/invoices/', data).then((res) => res.data),

  update: (id: number, data: Partial<InvoiceCreatePayload>) =>
    api.patch<Invoice>(`/invoices/${id}/`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/invoices/${id}/`),

  // --- Status management ---

  changeStatus: (id: number, status: InvoiceStatus) =>
    api.patch<Invoice>(`/invoices/${id}/status/`, { status }).then((res) => res.data),
};
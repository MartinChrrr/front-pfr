import api from './axios';
import type { Quote, QuoteCreatePayload, QuoteStatus } from '../types/quote';

export const quotesApi = {
  getAll: (status?: QuoteStatus) => {
    const params = status ? { status } : {};
    return api.get<Quote[]>('/quotes/', { params }).then((res) => res.data);
  },

  getById: (id: number) =>
    api.get<Quote>(`/quotes/${id}/`).then((res) => res.data),

  create: (data: QuoteCreatePayload) =>
    api.post<Quote>('/quotes/', data).then((res) => res.data),

  update: (id: number, data: Partial<QuoteCreatePayload>) =>
    api.patch<Quote>(`/quotes/${id}/`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/quotes/${id}/`),

  // --- Status management ---

  changeStatus: (id: number, status: QuoteStatus) =>
    api.patch<Quote>(`/quotes/${id}/status/`, { status }).then((res) => res.data),

  // --- Convert to invoice ---

  convertToInvoice: (id: number) =>
    api.post(`/quotes/${id}/convert/`).then((res) => res.data),
};
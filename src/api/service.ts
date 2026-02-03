import api from './axios';
import type { Service, ServiceCreatePayload } from '../types/service';

export const servicesApi = {
  getAll: () =>
    api.get<Service[]>('/services/').then((res) => res.data),

  getById: (id: number) =>
    api.get<Service>(`/services/${id}/`).then((res) => res.data),

  create: (data: ServiceCreatePayload) =>
    api.post<Service>('/services/', data).then((res) => res.data),

  update: (id: number, data: Partial<ServiceCreatePayload>) =>
    api.patch<Service>(`/services/${id}/`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/services/${id}/`),
};
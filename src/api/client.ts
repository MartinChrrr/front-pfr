import api from './axios';
import type { Client, ClientCreatePayload, Address, AddressCreatePayload } from '../types/client';

export const clientsApi = {
  // --- Clients ---

  getAll: () =>
    api.get<Client[]>('/clients/').then((res) => res.data),

  getById: (id: number) =>
    api.get<Client>(`/clients/${id}/`).then((res) => res.data),

  create: (data: ClientCreatePayload) =>
    api.post<Client>('/clients/', data).then((res) => res.data),

  update: (id: number, data: Partial<ClientCreatePayload>) =>
    api.patch<Client>(`/clients/${id}/`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/clients/${id}/`),

  // --- Addresses (nested under client) ---

  getAddresses: (clientId: number) =>
    api.get<Address[]>(`/clients/${clientId}/addresses/`).then((res) => res.data),

  addAddress: (clientId: number, data: AddressCreatePayload) =>
    api.post<Address>(`/clients/${clientId}/addresses/`, data).then((res) => res.data),

  updateAddress: (clientId: number, addressId: number, data: Partial<AddressCreatePayload>) =>
    api.patch<Address>(`/clients/${clientId}/addresses/${addressId}/`, data).then((res) => res.data),

  deleteAddress: (clientId: number, addressId: number) =>
    api.delete(`/clients/${clientId}/addresses/${addressId}/`),
};
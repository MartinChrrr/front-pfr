import api from "./api";
import type { PaginatedResponse } from "../types";
import type { Client, ClientInput, Address, AddressInput } from "../types/client";

// --- Clients ---

export async function getClients(params?: Record<string, string | number>): Promise<PaginatedResponse<Client>> {
  const response = await api.get("/clients/", { params });
  return response.data.data;
}

export async function getClient(id: number): Promise<Client> {
  const response = await api.get(`/clients/${id}/`);
  return response.data.data;
}

export async function createClient(data: ClientInput): Promise<Client> {
  const response = await api.post("/clients/", data);
  return response.data.data;
}

export async function updateClient(id: number, data: Partial<ClientInput>): Promise<Client> {
  const response = await api.patch(`/clients/${id}/`, data);
  return response.data.data;
}

export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}/`);
}

// --- Addresses ---

export async function getAddresses(params?: Record<string, string | number>): Promise<PaginatedResponse<Address>> {
  const response = await api.get("/adresses/", { params });
  return response.data.data;
}

export async function createAddress(data: AddressInput & { client_id: number }): Promise<Address> {
  const response = await api.post("/adresses/", data);
  return response.data.data;
}

export async function updateAddress(id: number, data: Partial<AddressInput>): Promise<Address> {
  const response = await api.patch(`/adresses/${id}/`, data);
  return response.data.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await api.delete(`/adresses/${id}/`);
}

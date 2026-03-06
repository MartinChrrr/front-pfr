import api from "./api";
import type { PaginatedResponse } from "../types";
import type { Service, ServiceInput } from "../types/service";

export async function getServices(params?: Record<string, string | number>): Promise<PaginatedResponse<Service>> {
  const response = await api.get("/services/", { params });
  return response.data.data;
}

export async function getService(id: number): Promise<Service> {
  const response = await api.get(`/services/${id}/`);
  return response.data.data;
}

export async function createService(data: ServiceInput): Promise<Service> {
  const response = await api.post("/services/", data);
  return response.data.data;
}

export async function updateService(id: number, data: Partial<ServiceInput>): Promise<Service> {
  const response = await api.patch(`/services/${id}/`, data);
  return response.data.data;
}

export async function deleteService(id: number): Promise<void> {
  await api.delete(`/services/${id}/`);
}

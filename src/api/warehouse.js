import { kolosApi } from "./axios";

export async function getWarehouseItems() {
  const response = await kolosApi.get(`/warehouse`);
  return response.data;
}

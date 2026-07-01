import { apiRequest, queryString } from "@/lib/api";
import type { Product } from "@/types";
export const productsService = {
  list: (query: Record<string, string | number | boolean | undefined> = {}) =>
    apiRequest<Product[]>(`/products${queryString(query)}`),
  detail: (slug: string) => apiRequest<Product>(`/products/${encodeURIComponent(slug)}`),
};

import { apiRequest, queryString } from "@/lib/api";
import type { Category } from "@/types";
export const categoriesService = {
  list: (query: Record<string, string | number | undefined> = {}) =>
    apiRequest<Category[]>(`/categories${queryString(query)}`),
};

import { apiRequest, queryString } from "@/lib/api";
import type { Banner } from "@/types";
export const bannersService = {
  list: (query: Record<string, string | number | boolean | undefined> = {}) =>
    apiRequest<Banner[]>(`/banners${queryString(query)}`),
};

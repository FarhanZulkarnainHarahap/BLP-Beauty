import { apiRequest, queryString } from "@/lib/api";
import type { Campaign } from "@/types";
export const campaignsService = {
  list: (query: Record<string, string | number | boolean | undefined> = {}) =>
    apiRequest<Campaign[]>(`/campaigns${queryString(query)}`),
  detail: (slug: string) => apiRequest<Campaign>(`/campaigns/${encodeURIComponent(slug)}`),
};

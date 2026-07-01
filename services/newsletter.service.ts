import { apiRequest, queryString } from "@/lib/api";
import type { Subscriber } from "@/types";
export const newsletterService = {
  subscribe: (email: string) =>
    apiRequest<Subscriber>("/newsletter", { method: "POST", body: JSON.stringify({ email }) }),
  list: (query: Record<string, string | number | undefined> = {}) =>
    apiRequest<Subscriber[]>(`/newsletter${queryString(query)}`),
};

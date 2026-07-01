import { apiRequest, queryString } from "@/lib/api";
import type { Article } from "@/types";
export const articlesService = {
  list: (query: Record<string, string | number | boolean | undefined> = {}) =>
    apiRequest<Article[]>(`/articles${queryString(query)}`),
  detail: (slug: string) => apiRequest<Article>(`/articles/${encodeURIComponent(slug)}`),
};

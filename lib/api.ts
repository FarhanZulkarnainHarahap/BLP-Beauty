import type { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export function apiUrl(path = "") {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not configured");
  return `${API_URL}${path}`;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: {
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init.headers,
    },
    cache: init.cache ?? "no-store",
  });
  const payload = await response.json().catch(() => ({
    success: false,
    error: { code: "INVALID_RESPONSE", message: "API returned an invalid response" },
  }));
  if (!response.ok)
    throw new Error(payload.error?.message ?? `API request failed (${response.status})`);
  return payload;
}

export const queryString = (input: Record<string, string | number | boolean | undefined>) => {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const value = params.toString();
  return value ? `?${value}` : "";
};

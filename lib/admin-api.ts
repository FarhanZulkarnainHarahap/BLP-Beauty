import { API_URL } from "./api";
import { createInternalToken } from "./internal-token";
import { requireAdmin } from "./session";
import type { ApiResponse } from "@/types";
export async function adminApi<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  const session = await requireAdmin();
  const token = await createInternalToken(session.user);
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Admin API request failed");
  return result;
}

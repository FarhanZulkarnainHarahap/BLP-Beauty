import { apiUrl } from "./api";
import { requireStaff } from "./session";
import { cookies } from "next/headers";
import type { ApiResponse } from "@/types";
export async function adminApi<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  await requireStaff();
  const cookieHeader = (await cookies()).toString();
  const response = await fetch(apiUrl(path), {
    ...init,
    cache: "no-store",
    headers: {
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      Cookie: cookieHeader,
      ...init.headers,
    },
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Admin API request failed");
  return result;
}

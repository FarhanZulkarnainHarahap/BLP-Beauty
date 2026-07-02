import { apiUrl } from "./api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthSession } from "@/types";

export async function getSession(): Promise<AuthSession | null> {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch(apiUrl("/api/auth/session"), {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const session = (await response.json()) as AuthSession | null;
  return session?.user?.id ? session : null;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) redirect("/admin/login");
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) redirect("/unauthorized");
  return session;
}
export async function requireSuperAdmin() {
  const session = await requireAdmin();
  if (session.user.role !== "SUPER_ADMIN") redirect("/unauthorized");
  return session;
}

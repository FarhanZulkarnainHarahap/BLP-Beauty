import { apiUrl } from "./api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthSession, Role } from "@/types";

export async function getSession(): Promise<AuthSession | null> {
  try {
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(apiUrl("/api/auth/session"), {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const session = (await response.json()) as AuthSession | null;
    return session?.user?.id ? session : null;
  } catch {
    return null;
  }
}

export function dashboardPathForRole(role: Role) {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "SUPER_ADMIN") return "/dashboard/super_admin";
  return "/";
}

export async function requireRole(role: Role) {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  if (session.user.role !== role) {
    redirect(`/unauthorized?required=${role.toLowerCase()}`);
  }
  return session;
}

export async function requireCustomer() {
  return requireRole("USER");
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

export async function requireSuperAdmin() {
  return requireRole("SUPER_ADMIN");
}

export async function requireStaff() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    redirect("/unauthorized?required=staff");
  }
  return session;
}

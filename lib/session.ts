import { auth } from "@/auth";
import { redirect } from "next/navigation";
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) redirect("/unauthorized");
  return session;
}
export async function requireSuperAdmin() {
  const session = await requireAdmin();
  if (session.user.role !== "SUPER_ADMIN") redirect("/unauthorized");
  return session;
}

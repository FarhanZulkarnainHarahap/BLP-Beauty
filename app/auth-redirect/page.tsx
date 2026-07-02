import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
export default async function AuthRedirect() {
  const session = await getSession();
  if (!session) redirect("/login");
  redirect(["ADMIN", "SUPER_ADMIN"].includes(session.user.role) ? "/admin/dashboard" : "/");
}

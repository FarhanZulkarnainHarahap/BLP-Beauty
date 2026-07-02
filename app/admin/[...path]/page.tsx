import { redirect } from "next/navigation";

export default async function LegacyAdmin({ params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path;

  if (path[0] === "users") {
    redirect("/dashboard/super_admin/users");
  }

  const adminPath = path[0] === "dashboard" ? path.slice(1) : path;
  redirect(`/dashboard/admin${adminPath.length ? `/${adminPath.join("/")}` : ""}`);
}

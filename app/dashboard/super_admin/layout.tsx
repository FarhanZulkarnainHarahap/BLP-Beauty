import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireSuperAdmin } from "@/lib/session";

export default async function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSuperAdmin();
  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}

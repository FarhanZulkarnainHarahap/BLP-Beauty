import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireAdmin } from "@/lib/session";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}

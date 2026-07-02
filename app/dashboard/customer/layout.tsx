import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireCustomer } from "@/lib/session";

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireCustomer();
  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}

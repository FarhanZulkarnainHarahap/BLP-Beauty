import { requireAdmin } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return (
    <div className="min-h-screen bg-[#f7f1ea] lg:flex">
      <AdminSidebar role={session.user.role} />
      <div className="min-w-0 flex-1">
        <AdminTopbar user={session.user} />
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

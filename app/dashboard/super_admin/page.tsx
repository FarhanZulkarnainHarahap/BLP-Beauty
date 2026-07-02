import { ShieldCheck, UserCog, Users } from "lucide-react";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { adminApi } from "@/lib/admin-api";
import type { User } from "@/types";

export default async function SuperAdminDashboard() {
  const users = await adminApi<User[]>("/users")
    .then((result) => result.data)
    .catch(() => []);

  const roleCount = (role: User["role"]) => users.filter((user) => user.role === role).length;

  return (
    <>
      <div>
        <p className="eyebrow">System access</p>
        <h1 className="mt-2 serif text-4xl">BLP control room.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#765f56]">
          Review account access and keep every dashboard role intentional.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="All users" value={users.length} detail="Connected BLP accounts" />
        <DashboardCard label="Customers" value={roleCount("USER")} detail="Customer dashboard" />
        <DashboardCard label="Admins" value={roleCount("ADMIN")} detail="Content studio" />
        <DashboardCard
          label="Super admins"
          value={roleCount("SUPER_ADMIN")}
          detail="Full access control"
        />
      </div>

      <section className="card mt-8 grid gap-6 p-7 md:grid-cols-3">
        {[
          [Users, "One account, one role", "Every signed-in account is sent to its own workspace."],
          [UserCog, "Role management", "Promote or update access from Users & access."],
          [ShieldCheck, "Protected routes", "Dashboard access is checked before rendering."],
        ].map(([Icon, title, copy]) => (
          <div key={title as string}>
            <Icon className="text-[#6f1f35]" />
            <h2 className="mt-5 font-bold">{title as string}</h2>
            <p className="mt-2 text-sm leading-6 text-[#765f56]">{copy as string}</p>
          </div>
        ))}
      </section>
    </>
  );
}

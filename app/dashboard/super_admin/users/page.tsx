import { requireSuperAdmin } from "@/lib/session";
import { adminApi } from "@/lib/admin-api";
import type { User } from "@/types";
import { UsersManager } from "@/components/admin/UsersManager";
export default async function Users() {
  const session = await requireSuperAdmin();
  let users: User[] = [];
  try {
    users = (await adminApi<User[]>("/users")).data;
  } catch {}
  return (
    <>
      <p className="eyebrow">Super admin only</p>
      <h1 className="mt-2 serif text-4xl">Users & access</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#765f56]">
        Manage who can enter the content studio. Your own role and account are protected from
        accidental changes.
      </p>
      <UsersManager initial={users} currentId={session.user.id} />
    </>
  );
}

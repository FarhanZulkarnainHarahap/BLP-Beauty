import type { Session } from "next-auth";
import { SignOutButton } from "./SignOutButton";
export function AdminTopbar({ user }: { user: Session["user"] }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#4a30291f] bg-white px-5 md:px-8">
      <div>
        <p className="text-xs text-[#8a756c]">Beauty desk</p>
        <p className="font-bold">{user.name || user.email}</p>
      </div>
      <div className="flex items-center gap-5">
        <span className="rounded-full bg-[#ead2d3] px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#6f1f35]">
          {user.role}
        </span>
        <SignOutButton />
      </div>
    </header>
  );
}

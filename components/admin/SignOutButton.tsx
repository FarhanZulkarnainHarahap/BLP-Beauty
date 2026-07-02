"use client";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
export function SignOutButton() {
  return (
    <button
      onClick={() => void signOut("/")}
      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#755f56]"
    >
      <LogOut size={15} />
      Sign out
    </button>
  );
}

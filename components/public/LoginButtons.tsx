"use client";
import { signIn } from "next-auth/react";
const providers = [
  ["google", "Google"],
  ["facebook", "Facebook"],
  ["tiktok", "TikTok"],
];
export function LoginButtons({ callbackUrl = "/auth-redirect" }: { callbackUrl?: string }) {
  return (
    <div className="grid gap-3">
      {providers.map(([id, label]) => (
        <button
          key={id}
          onClick={() => signIn(id, { redirectTo: callbackUrl })}
          className={
            "flex h-13 items-center justify-center rounded-full border border-[#4a302933] " +
            "bg-white text-sm font-bold transition hover:-translate-y-0.5 hover:border-[#6f1f35]"
          }
        >
          Continue with {label}
        </button>
      ))}
    </div>
  );
}

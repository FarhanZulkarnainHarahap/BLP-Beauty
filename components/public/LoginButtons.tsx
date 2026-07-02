"use client";
import { signIn } from "@/lib/auth-client";
const providers = [
  ["google", "Google"],
  ["facebook", "Facebook"],
];
export function LoginButtons({ callbackUrl = "/auth-redirect" }: { callbackUrl?: string }) {
  return (
    <div className="grid gap-3">
      {providers.map(([id, label]) => (
        <button
          key={id}
          onClick={() => void signIn(id as "google" | "facebook", callbackUrl)}
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

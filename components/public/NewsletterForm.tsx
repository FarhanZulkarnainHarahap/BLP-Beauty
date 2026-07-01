"use client";
import { useState } from "react";
import { newsletterService } from "@/services/newsletter.service";
import { newsletterSchema } from "@/lib/validators";
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      await newsletterService.subscribe(parsed.data.email);
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="field !rounded-full"
      />
      <button disabled={state === "loading"} className="btn shrink-0">
        {state === "loading" ? "Joining…" : "Join the list"}
      </button>
      {state === "done" && (
        <span className="self-center text-sm text-[#6f1f35]">You’re on the list.</span>
      )}
      {state === "error" && (
        <span className="self-center text-sm text-red-700">Please try again.</span>
      )}
    </form>
  );
}

import { Bell, CheckCircle2, Sparkles } from "lucide-react";
import { requireCustomer } from "@/lib/session";

export const metadata = { title: "Notifications" };

export default async function Notifications() {
  const { user } = await requireCustomer();

  return (
    <section className="shell py-16">
      <p className="eyebrow">Stay in the loop</p>
      <h1 className="display mt-3 !text-[clamp(3rem,7vw,5.5rem)]">Notifications.</h1>
      <p className="mt-5 max-w-2xl leading-7 text-[#6d5951]">
        Hello {user.name || "BLP member"}, your account updates and beauty notes will appear here.
      </p>

      <div className="mt-10 grid gap-4">
        <article className="card flex gap-4 p-6">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ead2d3]">
            <Sparkles size={19} className="text-[#6f1f35]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold">Welcome to your BLP space</h2>
              <span className="h-2 w-2 rounded-full bg-[#6f1f35]" />
            </div>
            <p className="mt-2 text-sm leading-6 text-[#765f56]">
              Your account is ready. Explore products, campaigns, and the latest journal stories.
            </p>
          </div>
        </article>
        <article className="card flex gap-4 p-6">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f1e6d8]">
            <Bell size={19} className="text-[#6f1f35]" />
          </div>
          <div>
            <h2 className="font-bold">You are all caught up</h2>
            <p className="mt-2 text-sm leading-6 text-[#765f56]">
              New private offers and account notices will be collected here.
            </p>
          </div>
          <CheckCircle2 className="ml-auto shrink-0 text-emerald-700" size={19} />
        </article>
      </div>
    </section>
  );
}

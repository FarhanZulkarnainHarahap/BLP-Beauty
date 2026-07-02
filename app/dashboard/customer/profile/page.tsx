import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { requireCustomer } from "@/lib/session";

export const metadata = { title: "Profile" };

export default async function CustomerProfile() {
  const { user } = await requireCustomer();

  return (
    <section className="shell py-14">
      <p className="eyebrow">My account</p>
      <h1 className="display mt-3 !text-[clamp(3rem,7vw,5.5rem)]">Your profile.</h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="card p-8 text-center">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Profile"}
              className="mx-auto h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-[#ead2d3]">
              <UserRound size={42} className="text-[#6f1f35]" />
            </div>
          )}
          <h2 className="mt-5 serif text-3xl">{user.name || "BLP member"}</h2>
          <p className="mt-2 text-sm text-[#806b63]">{user.email}</p>
        </div>

        <div className="card p-7 md:p-9">
          <h2 className="serif text-3xl">Account details</h2>
          <div className="mt-7 grid gap-4">
            <div className="flex items-center gap-4 rounded-2xl bg-[#f7f1ea] p-4">
              <Mail className="text-[#6f1f35]" size={20} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a756c]">
                  Email
                </p>
                <p className="mt-1 text-sm">{user.email || "No email provided"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-[#f7f1ea] p-4">
              <ShieldCheck className="text-[#6f1f35]" size={20} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a756c]">
                  Access
                </p>
                <p className="mt-1 text-sm">Customer · secured by your connected account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { PublicLayout } from "@/components/layout/PublicLayout";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { campaignsService } from "@/services/campaigns.service";
export const metadata = { title: "Campaigns" };
export default async function Campaigns() {
  let data = null;
  try {
    data = (await campaignsService.list({ limit: 30 })).data;
  } catch {}
  return (
    <PublicLayout>
      <section className="shell py-16">
        <p className="eyebrow">Stories in colour</p>
        <h1 className="display mt-4">The campaigns.</h1>
        {data === null ? (
          <ErrorState />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {data.length ? (
              data.map((c, i) => (
                <article key={c.id} className={`card group ${i % 3 === 0 ? "md:col-span-2" : ""}`}>
                  <div
                    className={`${i % 3 === 0 ? "aspect-[16/7]" : "aspect-[4/3]"} overflow-hidden`}
                  >
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <p className="eyebrow">BLP edit</p>
                    <h2 className="mt-2 serif text-3xl">{c.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6d5951]">
                      {c.description}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}

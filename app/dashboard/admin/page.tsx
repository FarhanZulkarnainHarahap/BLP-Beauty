import { DashboardCard } from "@/components/admin/DashboardCard";
import { adminApi } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import type { Article, Banner, Campaign, Category, Product, Subscriber } from "@/types";
export default async function Dashboard() {
  const results = await Promise.allSettled([
    adminApi<Product[]>("/products?admin=true&limit=5"),
    adminApi<Category[]>("/categories?admin=true&limit=5"),
    adminApi<Banner[]>("/banners?admin=true&limit=5"),
    adminApi<Campaign[]>("/campaigns?admin=true&limit=5"),
    adminApi<Article[]>("/articles?admin=true&limit=5"),
    adminApi<Subscriber[]>("/newsletter?limit=5"),
  ]);
  const count = (i: number) =>
    results[i].status === "fulfilled"
      ? ((results[i] as PromiseFulfilledResult<{ meta?: { total: number } }>).value.meta?.total ??
        0)
      : 0;
  const products = results[0].status === "fulfilled" ? results[0].value.data : [];
  const articles = results[4].status === "fulfilled" ? results[4].value.data : [];
  return (
    <>
      <div>
        <p className="eyebrow">At a glance</p>
        <h1 className="mt-2 serif text-4xl">Good morning, beauty team.</h1>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Products", count(0), "Across your full catalogue"],
          ["Categories", count(1), "Ways to discover"],
          ["Banners", count(2), "Hero stories"],
          ["Campaigns", count(3), "Live and draft edits"],
          ["Articles", count(4), "Journal entries"],
          ["Subscribers", count(5), "People on your list"],
        ].map(([l, v, d]) => (
          <DashboardCard
            key={l as string}
            label={l as string}
            value={v as number}
            detail={d as string}
          />
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="card p-6">
          <h2 className="serif text-2xl">Recent products</h2>
          <div className="mt-5 divide-y divide-[#4a30291a]">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 text-sm">
                <span>{p.name}</span>
                <span className="text-xs text-[#8a746b]">{p.category?.name}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-6">
          <h2 className="serif text-2xl">Recent journal</h2>
          <div className="mt-5 divide-y divide-[#4a30291a]">
            {articles.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 text-sm">
                <span>{a.title}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-[9px] font-bold",
                    a.isPublished ? "bg-green-100 text-green-800" : "bg-stone-100",
                  )}
                >
                  {a.isPublished ? "LIVE" : "DRAFT"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProductCard } from "@/components/public/ProductCard";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { productsService } from "@/services/products.service";
import { categoriesService } from "@/services/categories.service";
import Link from "next/link";
import { cn } from "@/lib/utils";
export const metadata = { title: "Shop" };
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const q = await searchParams;
  let products = null,
    categories = [] as Awaited<ReturnType<typeof categoriesService.list>>["data"],
    meta;
  try {
    const [result, cats] = await Promise.all([
      productsService.list({
        search: q.search,
        category: q.category,
        sort: q.sort,
        page: q.page,
        limit: 12,
      }),
      categoriesService.list({ limit: 100 }),
    ]);
    products = result.data;
    meta = result.meta;
    categories = cats.data;
  } catch {}
  return (
    <PublicLayout>
      <section className="shell py-16">
        <p className="eyebrow">The complete collection</p>
        <h1 className="display mt-3 !text-[clamp(3rem,7vw,6rem)]">Beauty, your way.</h1>
        <form className="mt-10 grid gap-3 rounded-3xl bg-[#f1e6d8] p-4 md:grid-cols-[1fr_220px_220px_auto]">
          <input
            name="search"
            defaultValue={q.search}
            placeholder="Search formulas, shades…"
            className="field"
          />
          <select name="category" defaultValue={q.category} className="field">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <select name="sort" defaultValue={q.sort} className="field">
            <option value="">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
          <button className="btn !rounded-xl">Refine</button>
        </form>
        {products === null ? (
          <ErrorState />
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.length ? (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <EmptyState
                title="No perfect match—yet"
                copy="Try a broader search or another category."
              />
            )}
          </div>
        )}
        {meta && meta.pages > 1 && (
          <div className="mt-14 flex justify-center gap-2">
            {Array.from({ length: meta.pages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border",
                  page === meta.page ? "bg-[#6f1f35] text-white" : "border-[#4a302933]",
                )}
                href={{ pathname: "/products", query: { ...q, page } }}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}

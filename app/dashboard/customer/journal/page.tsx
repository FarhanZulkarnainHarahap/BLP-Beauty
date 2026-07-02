import Link from "next/link";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { articlesService } from "@/services/articles.service";
export const metadata = { title: "Journal" };
export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const q = await searchParams;
  let data = null;
  try {
    data = (await articlesService.list({ search: q.search, limit: 30 })).data;
  } catch {}
  return (
    <section className="shell py-16">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="eyebrow">Notes from BLP</p>
          <h1 className="display mt-3">The journal.</h1>
        </div>
        <form className="flex gap-2">
          <input
            className="field"
            name="search"
            defaultValue={q.search}
            placeholder="Search the journal"
          />
          <button className="btn !rounded-xl">Search</button>
        </form>
      </div>
      {data === null ? (
        <ErrorState />
      ) : (
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {data.length ? (
            data.map((a) => (
              <Link href={`/journal/${a.slug}`} key={a.id} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-[#ead2d3]">
                  {a.imageUrl && (
                    <img
                      src={a.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-5 text-[10px] font-bold tracking-widest text-[#8b6d63] uppercase">
                  {new Date(a.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-2 serif text-2xl">{a.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#6d5951]">{a.excerpt}</p>
              </Link>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      )}
    </section>
  );
}

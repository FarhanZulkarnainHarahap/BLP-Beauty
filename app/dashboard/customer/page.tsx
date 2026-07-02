import Link from "next/link";
import { ArrowRight, BookOpen, GalleryVerticalEnd, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/public/ProductCard";
import { productsService } from "@/services/products.service";

const shortcuts = [
  {
    title: "Shop the collection",
    copy: "Find formulas, finishes, and colours made for your everyday rhythm.",
    href: "/dashboard/customer/shop",
    icon: ShoppingBag,
  },
  {
    title: "Current campaigns",
    copy: "Step inside the latest BLP stories, edits, and colour inspiration.",
    href: "/dashboard/customer/campaign",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Read the journal",
    copy: "Thoughtful beauty notes, product rituals, and stories from BLP.",
    href: "/dashboard/customer/journal",
    icon: BookOpen,
  },
];

export default async function CustomerDashboard() {
  const result = await productsService
    .list({ bestSeller: true, limit: 4 })
    .catch(() => ({ data: [] }));

  return (
    <>
      <section className="relative overflow-hidden bg-[#6f1f35] px-6 py-20 text-white md:px-12 lg:px-16">
        <div className="relative z-10 max-w-3xl">
          <p className="eyebrow !text-[#e8bfc4]">Your BLP space</p>
          <h1 className="display mt-5">Beauty that moves with you.</h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 md:text-base">
            Explore the collection, follow our newest stories, and keep your BLP profile together in
            one personal space.
          </p>
          <Link
            href="/dashboard/customer/shop"
            className="btn mt-8 !border-white !bg-white !text-[#6f1f35]"
          >
            Start shopping
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-[#d9a6ae]/20 blur-3xl" />
      </section>

      <section className="shell py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {shortcuts.map(({ title, copy, href, icon: Icon }) => (
            <Link href={href} key={href} className="card group p-7 transition hover:-translate-y-1">
              <Icon className="text-[#6f1f35]" />
              <h2 className="mt-8 serif text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#76645d]">{copy}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6f1f35]">
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {result.data.length > 0 && (
        <section className="shell pb-20">
          <p className="eyebrow">Loved on repeat</p>
          <h2 className="section-title mt-3">Your BLP picks</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 xl:grid-cols-4">
            {result.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

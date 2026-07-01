import Link from "next/link";
import { ArrowRight, Leaf, Palette, Sparkles } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProductCard } from "@/components/public/ProductCard";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { bannersService } from "@/services/banners.service";
import { productsService } from "@/services/products.service";
import { categoriesService } from "@/services/categories.service";
import { campaignsService } from "@/services/campaigns.service";

export default async function Home() {
  const [bannerResult, productResult, categoryResult, campaignResult] = await Promise.allSettled([
    bannersService.list({ limit: 1 }),
    productsService.list({ bestSeller: true, limit: 4 }),
    categoriesService.list({ limit: 4 }),
    campaignsService.list({ limit: 1 }),
  ]);
  const banner = bannerResult.status === "fulfilled" ? bannerResult.value.data[0] : null;
  const products = productResult.status === "fulfilled" ? productResult.value.data : [];
  const categories = categoryResult.status === "fulfilled" ? categoryResult.value.data : [];
  const campaign = campaignResult.status === "fulfilled" ? campaignResult.value.data[0] : null;
  const apiError = [bannerResult, productResult, categoryResult, campaignResult].some(
    (r) => r.status === "rejected",
  );
  return (
    <PublicLayout>
      {apiError && <ErrorState />}
      {banner ? (
        <section className="shell relative mt-5 min-h-[72vh] overflow-hidden rounded-[32px] bg-[#d8c0ad]">
          <img
            src={banner.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241b18cc] via-[#241b1866] to-transparent" />
          <div className="relative flex min-h-[72vh] max-w-2xl flex-col justify-end p-8 text-white md:p-16">
            <p className="eyebrow !text-[#f2d8d3]">New beauty, familiar you</p>
            <h1 className="display mt-5">{banner.title}</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 md:text-base">
              {banner.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={banner.buttonLink}
                className="btn !border-white !bg-white !text-[#6f1f35]"
              >
                {banner.buttonText}
                <ArrowRight size={15} />
              </Link>
              <Link href="/products?sort=newest" className="btn !border-white/50 !bg-transparent">
                Find your shade
              </Link>
            </div>
          </div>
        </section>
      ) : (
        !apiError && (
          <EmptyState
            title="Your hero is ready for a story"
            copy="Activate a banner from the admin panel."
          />
        )
      )}
      <section className="shell py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our philosophy</p>
          <h2 className="section-title mt-4">Beauty that leaves room for you.</h2>
          <p className="mt-6 text-sm leading-7 text-[#76645d]">
            No rules, no masks. Just thoughtful colour and skin-loving comfort for however you
            choose to show up today.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            [Sparkles, "Performance, softly", "High-impact formulas without the heavy feeling."],
            [Palette, "Made to mix", "Build, blend, and make every shade your own."],
            [Leaf, "Considered choices", "Created with care for skin, ritual, and everyday life."],
          ].map(([Icon, title, copy]) => (
            <div className="card p-8" key={title as string}>
              <Icon className="text-[#6f1f35]" />
              <h3 className="mt-8 serif text-2xl">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-[#76645d]">{copy as string}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#f1e6d8] py-24">
        <div className="shell">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Loved on repeat</p>
              <h2 className="section-title mt-3">Your beauty picks</h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wider md:flex"
            >
              Shop all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {products.length ? (
              products.map((p) => <ProductCard product={p} key={p.id} />)
            ) : (
              <EmptyState
                title="No best sellers yet"
                copy="Mark products as best sellers in the admin panel."
              />
            )}
          </div>
        </div>
      </section>
      <section className="shell py-24">
        <p className="eyebrow">Shop your ritual</p>
        <h2 className="section-title mt-3">Find your category</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[#ead2d3]"
            >
              {c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase">Explore</span>
                <h3 className="mt-1 serif text-2xl">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {campaign && (
        <section className="shell grid overflow-hidden rounded-[32px] bg-[#6f1f35] text-white md:grid-cols-2">
          <div className="min-h-[420px]">
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-9 md:p-16">
            <p className="eyebrow !text-[#e8bfc4]">The current edit</p>
            <h2 className="section-title mt-4">{campaign.title}</h2>
            <p className="mt-6 leading-7 text-white/75">{campaign.description}</p>
            <Link
              href={campaign.buttonLink || "/campaigns"}
              className="btn mt-8 self-start !border-white !bg-white !text-[#6f1f35]"
            >
              {campaign.buttonText || "Discover campaign"}
            </Link>
          </div>
        </section>
      )}
      <section className="shell py-24 text-center">
        <p className="eyebrow">Notes from MARA</p>
        <h2 className="section-title mt-4">A little beauty in your inbox.</h2>
        <p className="mt-4 text-sm text-[#76645d]">
          First looks, thoughtful tips, and private offers. Only the good stuff.
        </p>
        <NewsletterForm />
      </section>
    </PublicLayout>
  );
}

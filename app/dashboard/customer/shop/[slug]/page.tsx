import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { productsService } from "@/services/products.service";
const rupiah = (v: string | number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(v));
export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product;
  try {
    product = (await productsService.detail(slug)).data;
  } catch {
    return notFound();
  }
  return (
    <section className="shell py-10">
      <Link
        href="/dashboard/customer/shop"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
      >
        <ArrowLeft size={15} />
        All products
      </Link>
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden rounded-[32px] bg-[#eadfd5]">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">{product.category.name}</p>
          <h1 className="display mt-4 !text-[clamp(3rem,6vw,5.5rem)]">{product.name}</h1>
          <div className="mt-6 flex items-center gap-3 text-lg">
            <span className={product.discountPrice ? "line-through text-[#927c72]" : ""}>
              {rupiah(product.price)}
            </span>
            {product.discountPrice && (
              <strong className="text-[#6f1f35]">{rupiah(product.discountPrice)}</strong>
            )}
          </div>
          <p className="mt-8 leading-8 text-[#5f4c45]">{product.description}</p>
          <div className="mt-8 flex items-center gap-2 text-sm">
            <Check size={18} className="text-[#6f1f35]" />
            {product.stock > 0
              ? `${product.stock} in stock — ready to glow`
              : "Currently out of stock"}
          </div>
          <button disabled={product.stock === 0} className="btn mt-8 w-full sm:w-fit">
            Add to beauty bag
          </button>
          <p className="mt-4 text-xs text-[#8b756d]">
            Secure checkout · Easy returns · Authentic product
          </p>
        </div>
      </div>
    </section>
  );
}

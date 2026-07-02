"use client";
import type { Product } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
const rupiah = (value: string | number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#eee2d8]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span
              className={
                "absolute left-3 top-3 rounded-full bg-[#fbf7f1] px-3 py-1.5 " +
                "text-[9px] font-bold tracking-widest text-[#6f1f35]"
              }
            >
              {product.badge}
            </span>
          )}
          <span
            className={
              "absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full " +
              "bg-white text-xl opacity-0 shadow-lg transition group-hover:opacity-100"
            }
          >
            +
          </span>
        </div>
        <p className="mt-4 text-[10px] font-bold tracking-[.15em] text-[#8b6e62] uppercase">
          {product.category?.name}
        </p>
        <h3 className="mt-1 serif text-xl">{product.name}</h3>
        <div className="mt-2 flex gap-2 text-sm">
          <span className={product.discountPrice ? "text-[#917c73] line-through" : ""}>
            {rupiah(product.price)}
          </span>
          {product.discountPrice && (
            <span className="font-bold text-[#6f1f35]">{rupiah(product.discountPrice)}</span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

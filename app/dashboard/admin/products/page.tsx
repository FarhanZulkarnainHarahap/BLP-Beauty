import Link from "next/link";
import { adminApi } from "@/lib/admin-api";
import type { Product } from "@/types";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
export default async function AdminProducts() {
  let products: Product[] = [];
  try {
    products = (await adminApi<Product[]>("/products?admin=true&limit=100")).data;
  } catch {}
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="mt-2 serif text-4xl">Products</h1>
        </div>
        <Link className="btn" href="/dashboard/admin/products/create">
          Create product
        </Link>
      </div>
      <AdminProductsTable initial={products} />
    </>
  );
}

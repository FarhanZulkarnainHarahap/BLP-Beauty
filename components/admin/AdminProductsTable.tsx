"use client";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { Trash2 } from "lucide-react";

export function AdminProductsTable({ initial }: { initial: Product[] }) {
  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState("");

  const shownProducts = items.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;

    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems((products) => products.filter((product) => product.id !== id));
    }
  }

  return (
    <>
      <div className="card mt-7 p-4">
        <input
          className="field max-w-md"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="card mt-5 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-[#f1e6d8] text-[10px] uppercase tracking-wider">
            <tr>
              <th className="p-4">Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {shownProducts.map((product) => (
              <tr key={product.id} className="border-t border-[#4a302914]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <strong>{product.name}</strong>
                  </div>
                </td>
                <td>{product.category?.name}</td>
                <td>{product.stock}</td>
                <td>{product.isPublished ? "Published" : "Draft"}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-3">
                    <Link
                      className="rounded-lg border px-3 py-2 text-xs font-bold"
                      href={`/dashboard/admin/products/${product.id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(product.id)}
                      className="rounded-lg border p-2 text-red-700"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

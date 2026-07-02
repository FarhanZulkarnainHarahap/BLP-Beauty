"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/types";
import { productSchema } from "@/lib/validators";

export function ProductForm({ id }: { id?: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories?admin=true&limit=100")
      .then((r) => r.json())
      .then((j) => setCategories(j.data ?? []));
    if (id)
      fetch("/api/admin/products?admin=true&limit=100")
        .then((r) => r.json())
        .then((j) => setProduct((j.data ?? []).find((p: Product) => p.id === id) ?? null));
  }, [id]);
  async function upload(file: File) {
    setUploading(true);

    try {
      const body = new FormData();
      body.set("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message);
      }

      return result.data.url as string;
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const file = form.get("image") as File;
      let imageUrl = String(form.get("imageUrl"));
      if (file?.size) imageUrl = await upload(file);
      const parsed = productSchema.safeParse({
        name: form.get("name"),
        description: form.get("description"),
        price: form.get("price"),
        discountPrice: form.get("discountPrice") ? form.get("discountPrice") : null,
        imageUrl,
        categoryId: form.get("categoryId"),
        badge: form.get("badge") || null,
        stock: form.get("stock"),
        isBestSeller: form.get("isBestSeller") === "on",
        isPublished: form.get("isPublished") === "on",
      });
      if (!parsed.success)
        throw new Error(parsed.error.issues[0]?.message || "Check the product fields");
      const r = await fetch(`/api/admin/products${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error?.message);
      router.push("/dashboard/admin/products");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save product");
    }
  }
  if (id && !product) return <div className="card p-8">Loading product…</div>;
  return (
    <form onSubmit={save} className="card mt-7 grid gap-5 p-6 md:grid-cols-2">
      <label className="label">
        Product name
        <input required name="name" defaultValue={product?.name} className="field" />
      </label>
      <label className="label">
        Category
        <select required name="categoryId" defaultValue={product?.categoryId} className="field">
          <option value="">Choose category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <label className="label md:col-span-2">
        Description
        <textarea
          required
          minLength={10}
          name="description"
          defaultValue={product?.description}
          className="field min-h-28"
        />
      </label>
      <label className="label">
        Price
        <input
          required
          min="0"
          type="number"
          name="price"
          defaultValue={String(product?.price ?? "")}
          className="field"
        />
      </label>
      <label className="label">
        Discount price
        <input
          min="0"
          type="number"
          name="discountPrice"
          defaultValue={String(product?.discountPrice ?? "")}
          className="field"
        />
      </label>
      <label className="label md:col-span-2">
        Existing image URL
        <input type="url" name="imageUrl" defaultValue={product?.imageUrl} className="field" />
      </label>
      <label className="label md:col-span-2">
        Or upload a new image
        <input
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="field"
        />
      </label>
      <label className="label">
        Badge
        <input name="badge" defaultValue={product?.badge ?? ""} className="field" />
      </label>
      <label className="label">
        Stock
        <input
          required
          min="0"
          type="number"
          name="stock"
          defaultValue={product?.stock ?? 0}
          className="field"
        />
      </label>
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          type="checkbox"
          name="isBestSeller"
          defaultChecked={product?.isBestSeller}
          className="h-5 w-5 accent-[#6f1f35]"
        />
        Best seller
      </label>
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={product?.isPublished}
          className="h-5 w-5 accent-[#6f1f35]"
        />
        Published
      </label>
      {error && <p className="md:col-span-2 text-sm text-red-700">{error}</p>}
      <button disabled={uploading} className="btn md:col-span-2">
        {uploading ? "Uploading…" : id ? "Update product" : "Create product"}
      </button>
    </form>
  );
}

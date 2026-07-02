import { ProductForm } from "@/components/admin/ProductForm";
export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-2 serif text-4xl">Edit product</h1>
      <ProductForm id={id} />
    </>
  );
}

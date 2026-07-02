import { CollectionManager } from "@/components/admin/CollectionManager";
export default function Categories() {
  return (
    <CollectionManager
      title="Categories"
      resource="categories"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "imageUrl", label: "Image", type: "image" },
      ]}
    />
  );
}

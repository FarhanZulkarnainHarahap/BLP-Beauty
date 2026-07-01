import { CollectionManager } from "@/components/admin/CollectionManager";
export default function Articles() {
  return (
    <CollectionManager
      title="Articles"
      resource="articles"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "imageUrl", label: "Image", type: "image" },
        { name: "isPublished", label: "Published", type: "boolean" },
      ]}
    />
  );
}

import { CollectionManager } from "@/components/admin/CollectionManager";
export default function Campaigns() {
  return (
    <CollectionManager
      title="Campaigns"
      resource="campaigns"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "imageUrl", label: "Image", type: "image", required: true },
        { name: "buttonText", label: "Button text" },
        { name: "buttonLink", label: "Button link" },
        { name: "isPublished", label: "Published", type: "boolean" },
      ]}
    />
  );
}

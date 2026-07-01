import { CollectionManager } from "@/components/admin/CollectionManager";
export default function Banners() {
  return (
    <CollectionManager
      title="Banners"
      resource="banners"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "subtitle", label: "Subtitle", type: "textarea", required: true },
        { name: "imageUrl", label: "Image", type: "image", required: true },
        { name: "buttonText", label: "Button text", required: true },
        { name: "buttonLink", label: "Button link", required: true },
        { name: "isActive", label: "Active", type: "boolean" },
      ]}
    />
  );
}

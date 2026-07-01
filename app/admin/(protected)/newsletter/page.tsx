import { CollectionManager } from "@/components/admin/CollectionManager";
export default function Newsletter() {
  return (
    <CollectionManager title="Newsletter subscribers" resource="newsletter" readOnly fields={[]} />
  );
}

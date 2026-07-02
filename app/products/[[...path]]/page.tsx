import { redirect } from "next/navigation";

export default async function LegacyProducts({ params }: { params: Promise<{ path?: string[] }> }) {
  const path = (await params).path?.join("/");
  redirect(`/dashboard/customer/shop${path ? `/${path}` : ""}`);
}

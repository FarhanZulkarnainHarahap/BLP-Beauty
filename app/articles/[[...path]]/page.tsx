import { redirect } from "next/navigation";

export default async function LegacyArticles({ params }: { params: Promise<{ path?: string[] }> }) {
  const path = (await params).path?.join("/");
  redirect(`/dashboard/customer/journal${path ? `/${path}` : ""}`);
}

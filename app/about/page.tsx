import { redirect } from "next/navigation";

export default function LegacyAbout() {
  redirect("/dashboard/customer/our-story");
}

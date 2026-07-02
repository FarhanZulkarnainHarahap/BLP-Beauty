import { redirect } from "next/navigation";

export default function AdminLogin() {
  redirect("/login?callbackUrl=/dashboard/admin");
}

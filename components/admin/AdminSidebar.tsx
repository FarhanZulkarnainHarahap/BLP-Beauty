import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Shapes,
  Image,
  GalleryVerticalEnd,
  Newspaper,
  Mail,
  Users,
} from "lucide-react";
const links = [
  ["Overview", "/admin/dashboard", LayoutDashboard],
  ["Products", "/admin/products", Package],
  ["Categories", "/admin/categories", Shapes],
  ["Banners", "/admin/banners", Image],
  ["Campaigns", "/admin/campaigns", GalleryVerticalEnd],
  ["Articles", "/admin/articles", Newspaper],
  ["Newsletter", "/admin/newsletter", Mail],
  ["Users", "/admin/users", Users],
] as const;
export function AdminSidebar({ role }: { role: string }) {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-[#2d201c] p-6 text-[#fbf7f1] lg:block">
      <Link href="/" className="serif text-2xl tracking-[.18em]">
        MARA
      </Link>
      <p className="mt-2 text-[9px] uppercase tracking-[.2em] text-white/40">Content studio</p>
      <nav className="mt-12 grid gap-1">
        {links
          .filter(([label]) => label !== "Users" || role === "SUPER_ADMIN")
          .map(([label, href, Icon]) => (
            <Link
              href={href}
              key={href}
              className={
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 " +
                "transition hover:bg-white/10 hover:text-white"
              }
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Crown,
  GalleryVerticalEnd,
  Heart,
  Home,
  Image,
  LayoutDashboard,
  Mail,
  Newspaper,
  Package,
  Shapes,
  ShoppingBag,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { cn } from "@/lib/utils";
import type { AuthUser, Role } from "@/types";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navigation: Record<Role, NavigationItem[]> = {
  USER: [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    { label: "Campaign", href: "/campaign", icon: GalleryVerticalEnd },
    { label: "Journal", href: "/journal", icon: BookOpen },
    { label: "Our story", href: "/our-story", icon: Heart },
    { label: "Profile", href: "/profile", icon: UserRound },
  ],
  ADMIN: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Products", href: "/dashboard/admin/products", icon: Package },
    { label: "Categories", href: "/dashboard/admin/categories", icon: Shapes },
    { label: "Banners", href: "/dashboard/admin/banners", icon: Image },
    { label: "Campaigns", href: "/dashboard/admin/campaigns", icon: GalleryVerticalEnd },
    { label: "Articles", href: "/dashboard/admin/articles", icon: Newspaper },
    { label: "Newsletter", href: "/dashboard/admin/newsletter", icon: Mail },
  ],
  SUPER_ADMIN: [
    { label: "Overview", href: "/dashboard/super_admin", icon: Crown },
    { label: "Users & access", href: "/dashboard/super_admin/users", icon: Users },
  ],
};

const workspaceLabel: Record<Role, string> = {
  USER: "Customer space",
  ADMIN: "Content studio",
  SUPER_ADMIN: "Control room",
};

function DashboardNavigation({ role }: { role: Role }) {
  const pathname = usePathname();

  return navigation[role].map(({ label, href, icon: Icon }) => {
    const isDashboardHome = href.split("/").filter(Boolean).length === 2;
    const active = pathname === href || (!isDashboardHome && pathname.startsWith(`${href}/`));

    return (
      <Link
        href={href}
        key={href}
        className={cn(
          "flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
          active
            ? "bg-white text-[#6f1f35] shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:text-white",
        )}
      >
        <Icon size={17} />
        {label}
      </Link>
    );
  });
}

export function DashboardShell({ user, children }: { user: AuthUser; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f1ea] lg:flex">
      <aside className="hidden min-h-screen w-68 shrink-0 bg-[#2d201c] p-6 text-[#fbf7f1] lg:block">
        <Link href="/" className="serif text-3xl tracking-[.18em]">
          BLP
        </Link>
        <p className="mt-2 text-[9px] uppercase tracking-[.2em] text-white/40">
          {workspaceLabel[user.role]}
        </p>
        <nav className="mt-12 grid gap-1">
          <DashboardNavigation role={user.role} />
        </nav>
        <div className="mt-12 rounded-2xl border border-white/10 p-4">
          <Sparkles size={18} className="text-[#e8bfc4]" />
          <p className="mt-3 text-xs leading-5 text-white/60">
            Beauty, made personal for every version of you.
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="border-b border-[#4a30291f] bg-white">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 md:px-8">
            <div>
              <p className="text-xs text-[#8a756c]">{workspaceLabel[user.role]}</p>
              <p className="font-bold">{user.name || user.email || "BLP member"}</p>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              <span className="hidden rounded-full bg-[#ead2d3] px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#6f1f35] sm:inline">
                {user.role}
              </span>
              <SignOutButton />
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto bg-[#2d201c] px-3 py-2 lg:hidden">
            <DashboardNavigation role={user.role} />
          </nav>
        </header>
        <main className={user.role === "USER" ? "" : "p-5 md:p-8"}>{children}</main>
      </div>
    </div>
  );
}

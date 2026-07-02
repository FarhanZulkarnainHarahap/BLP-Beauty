"use client";

import Link from "next/link";
import { Bell, LogIn, LogOut, Menu, Search, UserPlus, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signOut } from "@/lib/auth-client";
import type { AuthSession } from "@/types";

const links = [
  ["Shop", "/dashboard/customer/shop"],
  ["Campaign", "/dashboard/customer/campaign"],
  ["Journal", "/dashboard/customer/journal"],
  ["Our story", "/dashboard/customer/our-story"],
];

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/session", { credentials: "same-origin", cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((value: AuthSession | null) => {
        if (active) setSession(value?.user?.id ? value : null);
      })
      .catch(() => {
        if (active) setSession(null);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function closeMenu(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  const user = session?.user;
  const accountHref =
    user?.role === "ADMIN"
      ? "/dashboard/admin"
      : user?.role === "SUPER_ADMIN"
        ? "/dashboard/super_admin"
        : "/dashboard/customer/profile";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open account menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#ead2d3]"
      >
        <UserRound size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#4a30291f] bg-[#fbf7f1] shadow-[0_24px_70px_#2d201c2e]">
          {session === undefined ? (
            <div className="p-5 text-sm text-[#806b63]">Checking your BLP account…</div>
          ) : user ? (
            <>
              <div className="border-b border-[#4a30291f] p-5">
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#ead2d3]">
                      <UserRound size={20} className="text-[#6f1f35]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-bold">{user.name || "BLP member"}</p>
                    <p className="truncate text-xs text-[#806b63]">{user.email}</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                <Link
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-[#f1e6d8]"
                >
                  <UserRound size={17} />
                  Account
                </Link>
                <Link
                  href="/dashboard/customer/notifications"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-[#f1e6d8]"
                >
                  <Bell size={17} />
                  Notifications
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    void signOut("/");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#6f1f35] hover:bg-[#f1e6d8]"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </nav>
            </>
          ) : (
            <>
              <div className="border-b border-[#4a30291f] p-5">
                <p className="font-bold">Welcome to BLP</p>
                <p className="mt-1 text-xs leading-5 text-[#806b63]">
                  Sign in to keep your beauty space personal.
                </p>
              </div>
              <nav className="p-2">
                <Link
                  href="/login?callbackUrl=/dashboard/customer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-[#f1e6d8]"
                >
                  <LogIn size={17} />
                  Login
                </Link>
                <Link
                  href="/signup?callbackUrl=/dashboard/customer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-[#f1e6d8]"
                >
                  <UserPlus size={17} />
                  Sign up
                </Link>
                <Link
                  href="/login?callbackUrl=/dashboard/customer/notifications"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-[#f1e6d8]"
                >
                  <Bell size={17} />
                  Notifications
                </Link>
              </nav>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#4a30291f] bg-[#fbf7f1e8] backdrop-blur-xl">
      <div className="shell flex h-18 items-center justify-between">
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className="hidden gap-7 md:flex">
          {links.slice(0, 2).map(([label, href]) => (
            <Link
              key={href}
              className="text-xs font-bold tracking-wider uppercase hover:text-[#6f1f35]"
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/dashboard/customer" className="serif text-2xl tracking-[.18em]">
          BLP
        </Link>
        <div className="flex items-center gap-3 md:gap-7">
          <nav className="hidden items-center gap-7 md:flex">
            {links.slice(2).map(([label, href]) => (
              <Link
                key={href}
                className="text-xs font-bold tracking-wider uppercase hover:text-[#6f1f35]"
                href={href}
              >
                {label}
              </Link>
            ))}
            <button type="button" aria-label="Search">
              <Search size={18} />
            </button>
          </nav>
          <ProfileMenu />
        </div>
      </div>
      {open && (
        <nav className="border-t border-[#4a30291f] px-6 py-5 md:hidden">
          {links.map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              key={href}
              className="block border-b border-[#4a30291f] py-4 serif text-2xl"
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

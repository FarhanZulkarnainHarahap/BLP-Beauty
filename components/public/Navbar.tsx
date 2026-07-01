"use client";
import Link from "next/link";
import { Menu, Search, UserRound, X } from "lucide-react";
import { useState } from "react";
const links = [
  ["Shop", "/products"],
  ["Campaigns", "/campaigns"],
  ["Journal", "/articles"],
  ["Our story", "/about"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[#4a30291f] bg-[#fbf7f1e8] backdrop-blur-xl">
      <div className="shell flex h-18 items-center justify-between">
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
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
        <Link href="/" className="serif text-2xl tracking-[.18em]">
          MARA
        </Link>
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
          <Search size={18} />
          <Link href="/login">
            <UserRound size={18} />
          </Link>
        </nav>
        <Link href="/login" className="md:hidden">
          <UserRound size={20} />
        </Link>
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

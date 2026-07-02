import Link from "next/link";
export function Footer() {
  return (
    <footer className="mt-24 bg-[#2d201c] py-16 text-[#fbf7f1]">
      <div className="shell grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="serif text-4xl tracking-[.16em]">BLP</div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#d9ccc4]">
            Beauty essentials made to move with you—considered formulas, expressive colour, and
            comfort at the centre.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-[#d5b8a2]">Explore</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link href="/products">All products</Link>
            <Link href="/campaigns">Campaigns</Link>
            <Link href="/articles">The journal</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow !text-[#d5b8a2]">Company</p>
          <div className="mt-5 grid gap-3 text-sm">
            <Link href="/about">Our story</Link>
            <Link href="/login">Sign in</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
      <div className="shell mt-14 border-t border-white/15 pt-6 text-xs text-white/50">
        © 2026 BLP Beauty. Built for every version of you.
      </div>
    </footer>
  );
}

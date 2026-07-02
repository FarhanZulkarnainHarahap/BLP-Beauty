import Link from "next/link";
import { LoginButtons } from "@/components/public/LoginButtons";
export const metadata = { title: "Sign in" };
export default function Login() {
  return (
    <main className="grid min-h-screen bg-[#f1e6d8] md:grid-cols-2">
      <section
        className={
          "hidden bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400')] " +
          "bg-cover bg-center md:block"
        }
      />
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[32px] bg-[#fbf7f1] p-8 shadow-[0_30px_80px_#4a302920] md:p-12">
          <Link href="/" className="serif text-2xl tracking-[.18em]">
            BLP
          </Link>
          <p className="eyebrow mt-12">Welcome in</p>
          <h1 className="serif mt-3 text-5xl leading-none">Your beauty space awaits.</h1>
          <p className="mt-5 text-sm leading-7 text-[#735f57]">
            Sign in securely with your preferred account. We never expose your provider tokens to
            the browser.
          </p>
          <div className="mt-8">
            <LoginButtons />
          </div>
          <p className="mt-8 text-center text-xs text-[#927d75]">
            By continuing, you agree to our privacy and account terms.
          </p>
        </div>
      </section>
    </main>
  );
}

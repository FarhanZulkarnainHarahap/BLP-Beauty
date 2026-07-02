import Link from "next/link";
import { LoginButtons } from "@/components/public/LoginButtons";
export default function AdminLogin() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#2d201c] p-6">
      <div className="w-full max-w-md rounded-[30px] bg-[#fbf7f1] p-9">
        <Link href="/" className="serif text-2xl tracking-[.18em]">
          BLP
        </Link>
        <p className="eyebrow mt-10">Studio access</p>
        <h1 className="serif mt-3 text-4xl">Sign in to the beauty desk.</h1>
        <p className="mt-4 text-sm leading-6 text-[#715e56]">
          Only approved admin accounts can continue to the content studio.
        </p>
        <div className="mt-8">
          <LoginButtons />
        </div>
      </div>
    </main>
  );
}

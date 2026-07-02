import Link from "next/link";
import { LoginButtons } from "@/components/public/LoginButtons";

export const metadata = { title: "Create account" };

export default async function SignUp({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const requestedCallback = (await searchParams).callbackUrl;
  const callbackUrl =
    requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/";

  return (
    <main className="grid min-h-screen bg-[#f1e6d8] md:grid-cols-2">
      <section
        className={
          "hidden bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400')] " +
          "bg-cover bg-center md:block"
        }
      />
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[32px] bg-[#fbf7f1] p-8 shadow-[0_30px_80px_#4a302920] md:p-12">
          <Link href="/" className="serif text-2xl tracking-[.18em]">
            BLP
          </Link>
          <p className="eyebrow mt-12">Join the community</p>
          <h1 className="serif mt-3 text-5xl leading-none">Create your beauty space.</h1>
          <p className="mt-5 text-sm leading-7 text-[#735f57]">
            Continue with Google or Facebook. Your BLP account is created securely the first time
            you sign in.
          </p>
          <div className="mt-8">
            <LoginButtons callbackUrl={callbackUrl} />
          </div>
          <p className="mt-8 text-center text-xs text-[#927d75]">
            Already a member?{" "}
            <Link href="/login" className="font-bold text-[#6f1f35]">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

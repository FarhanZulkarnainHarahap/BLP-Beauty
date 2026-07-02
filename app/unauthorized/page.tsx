import Link from "next/link";
export default function Unauthorized() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f1e6d8] p-6 text-center">
      <div>
        <p className="eyebrow">403 · private studio</p>
        <h1 className="display mt-5">This room isn’t on your list.</h1>
        <p className="mx-auto mt-6 max-w-md leading-7 text-[#6d5951]">
          Your account is active, but its role does not match this dashboard. Return to your own
          workspace or ask a Super Admin to update your access.
        </p>
        <Link href="/auth-redirect" className="btn mt-8">
          Go to my dashboard
        </Link>
      </div>
    </main>
  );
}

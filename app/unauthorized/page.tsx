import Link from "next/link";
export default function Unauthorized() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f1e6d8] p-6 text-center">
      <div>
        <p className="eyebrow">403 · private studio</p>
        <h1 className="display mt-5">This room isn’t on your list.</h1>
        <p className="mx-auto mt-6 max-w-md leading-7 text-[#6d5951]">
          Your account is signed in, but it does not have an admin role. If this feels wrong, ask a
          Super Admin to update your access.
        </p>
        <Link href="/" className="btn mt-8">
          Back to beauty
        </Link>
      </div>
    </main>
  );
}

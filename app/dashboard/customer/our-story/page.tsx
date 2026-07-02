import Link from "next/link";
export const metadata = { title: "Our story" };
export default function About() {
  return (
    <>
      <section className="shell py-20 text-center">
        <p className="eyebrow">Our story</p>
        <h1 className="display mx-auto mt-5 max-w-5xl">Makeup should feel like possibility.</h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#66534c]">
          BLP Beauty began with a simple belief: beauty is not one finished look. It is every mood,
          experiment, quiet ritual, and bold choice that feels true to you.
        </p>
      </section>
      <section className="grid bg-[#ead2d3] md:grid-cols-2">
        <div
          className={
            "min-h-[480px] " +
            "bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400')] " +
            "bg-cover bg-center"
          }
        />
        <div className="flex flex-col justify-center p-10 md:p-20">
          <p className="eyebrow">Our mission</p>
          <h2 className="section-title mt-4">Comfort at the centre. Expression everywhere.</h2>
          <p className="mt-7 leading-8 text-[#604b45]">
            We create considered essentials with approachable colour, wearable texture, and
            performance that stays with you. No intimidating rules—just better tools for becoming
            more yourself.
          </p>
          <Link href="/dashboard/customer/shop" className="btn mt-8 self-start">
            Explore the collection
          </Link>
        </div>
      </section>
    </>
  );
}

import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata = {
  title: "Terms of Service",
  description: "Terms governing access to and use of the BLP Beauty website.",
};

const sections = [
  {
    title: "Using this website",
    content:
      "You may use this website to browse beauty content, manage your account, and access features " +
      "made available to you. You agree not to misuse the website, interfere with its operation, " +
      "attempt unauthorized access, or use it in violation of applicable law.",
  },
  {
    title: "Accounts and social login",
    content:
      "You are responsible for activity performed through your account. Social login is provided " +
      "through third-party platforms such as Google and Facebook. Your use of those " +
      "platforms remains subject to their respective terms and policies.",
  },
  {
    title: "Content and intellectual property",
    content:
      "Website design, text, graphics, branding, and original content are protected by applicable " +
      "intellectual-property laws. You may not reproduce or commercially distribute them without " +
      "permission from the relevant rights holder.",
  },
  {
    title: "Availability and changes",
    content:
      "We may improve, suspend, or discontinue parts of the service when reasonably necessary. We " +
      "do not promise uninterrupted availability, but we take reasonable steps to keep the website " +
      "secure and operational.",
  },
  {
    title: "Limitation of liability",
    content:
      "To the extent permitted by law, the website is provided without warranties beyond those " +
      "that cannot legally be excluded. We are not responsible for indirect losses arising from " +
      "service interruptions, third-party platforms, or unauthorized misuse of an account.",
  },
];

export default function TermsPage() {
  return (
    <PublicLayout>
      <article className="shell py-16">
        <header className="max-w-4xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display mt-4 !text-[clamp(3rem,7vw,6rem)]">Terms of Service</h1>
          <p className="mt-6 text-sm text-[#76645d]">Effective 1 July 2026</p>
        </header>

        <div className="mt-14 grid max-w-3xl gap-10">
          <p className="prose-beauty">
            These Terms of Service govern your access to and use of the BLP Beauty website. By
            continuing to use the website, you agree to these terms.
          </p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="serif text-3xl">{section.title}</h2>
              <p className="mt-4 leading-8 text-[#5f4c45]">{section.content}</p>
            </section>
          ))}

          <section>
            <h2 className="serif text-3xl">Questions</h2>
            <p className="mt-4 leading-8 text-[#5f4c45]">
              Questions about these terms can be submitted through the official BLP Beauty website
              or its verified support channels.
            </p>
          </section>
        </div>
      </article>
    </PublicLayout>
  );
}

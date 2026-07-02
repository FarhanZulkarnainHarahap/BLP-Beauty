import { PublicLayout } from "@/components/layout/PublicLayout";

export const metadata = {
  title: "Privacy Policy",
  description: "How BLP Beauty collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "Information we collect",
    content:
      "When you sign in, we receive the profile information authorized by your selected provider. " +
      "Depending on the provider, this may include your name, email address, profile image, and a " +
      "provider-specific account identifier.",
  },
  {
    title: "How information is used",
    content:
      "We use account information to authenticate you, maintain sessions, provide role-based " +
      "access, protect administrative features, and improve the website. Newsletter email " +
      "addresses are used only to provide updates requested by the subscriber.",
  },
  {
    title: "Storage and security",
    content:
      "Account and content data are stored in PostgreSQL. Images are stored through the configured " +
      "cloud media provider. Secrets and provider access tokens are handled on the server and are " +
      "not intentionally exposed to browser storage.",
  },
  {
    title: "Sharing and service providers",
    content:
      "We use service providers for hosting, authentication, databases, and media storage. They may " +
      "process information only as needed to provide their services. We do not sell personal data.",
  },
  {
    title: "Retention and your choices",
    content:
      "Information is retained while needed to operate an account, satisfy security requirements, " +
      "or comply with law. You may disconnect social access from the relevant provider and request " +
      "account deletion through an official support channel.",
  },
  {
    title: "Updates",
    content:
      "We may update this policy as the service evolves. Material changes will be reflected on this " +
      "page with a revised effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <article className="shell py-16">
        <header className="max-w-4xl">
          <p className="eyebrow">Your information</p>
          <h1 className="display mt-4 !text-[clamp(3rem,7vw,6rem)]">Privacy Policy</h1>
          <p className="mt-6 text-sm text-[#76645d]">Effective 1 July 2026</p>
        </header>

        <div className="mt-14 grid max-w-3xl gap-10">
          <p className="prose-beauty">
            This policy explains how BLP Beauty handles information when you browse the website,
            create an account, use social login, or subscribe to updates.
          </p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="serif text-3xl">{section.title}</h2>
              <p className="mt-4 leading-8 text-[#5f4c45]">{section.content}</p>
            </section>
          ))}
        </div>
      </article>
    </PublicLayout>
  );
}

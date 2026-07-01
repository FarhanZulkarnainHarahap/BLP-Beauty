import { AnnouncementBar } from "@/components/public/AnnouncementBar";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

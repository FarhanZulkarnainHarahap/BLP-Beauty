import { AnnouncementBar } from "@/components/public/AnnouncementBar";
import { Footer } from "@/components/public/Footer";
import { Navbar } from "@/components/public/Navbar";

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

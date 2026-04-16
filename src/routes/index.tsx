import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Arte Manual — Crochê Artesanal Feito com Amor" },
      { name: "description", content: "Peças únicas de crochê feitas à mão com carinho e dedicação. Mantas, amigurumis, bolsas e acessórios artesanais." },
      { property: "og:title", content: "Arte Manual — Crochê Artesanal" },
      { property: "og:description", content: "Peças únicas de crochê feitas à mão com carinho e dedicação." },
    ],
  }),
});

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

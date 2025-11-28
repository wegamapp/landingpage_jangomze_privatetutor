import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { Pricing } from "@/sections/Pricing";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Testimonials";
import SobreMi from "@/sections/AboutMe";

export default function Home() {
  return (
    <div>
      {/* Inicio */}
      <Header />

      <section id="inicio" className="scroll-mt-32">
        <Hero />
      </section>

      <LogoTicker />
      <ProductShowcase />
      <Pricing />

      {/* Sección Sobre mí */}
      <section id="sobremi" className="scroll-mt-32">
        <SobreMi />
      </section>

      <Testimonials />

      {/* Sección Call To Action */}
      <section id="contacta" className="scroll-mt-32">
        <CallToAction />
      </section>

      <Footer />
    </div>
  );
}


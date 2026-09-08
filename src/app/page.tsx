import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import SobreMi from "@/sections/AboutMe";
import { Services } from "@/sections/Services";
import { Portfolio } from "@/sections/Portfolio";
import { TechStack } from "@/sections/TechStack";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero variant="portfolio" />
      <SobreMi compact />
      <Services />
      <Portfolio />
      <TechStack />
      <CallToAction variant="simple" />
      <Footer />
    </div>
  );
}

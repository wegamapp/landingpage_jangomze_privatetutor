import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { LanguageProvider } from "@/contexts/LanguageContext";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clases de prueba gratis | Metodología Jan Gómez Escobar",
  description:
    "Reserva tu clase de prueba gratuita. Metodología de estudio de alto rendimiento con Jan Gómez Escobar: técnicas validadas, seguimiento personalizado y resultados medibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

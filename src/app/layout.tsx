import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { LanguageProvider } from "@/contexts/LanguageContext";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jan Gómez Escobar | Software, EdTech & Education",
  description:
    "Personal site of Jan Gómez Escobar: software engineering, AI/EdTech, research, and high-performance tutoring.",
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

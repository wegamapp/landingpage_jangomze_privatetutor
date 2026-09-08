"use client";
import Image from "next/image";
import { Github } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const socialIcons = [
  {
    name: "GitHub",
    href: "https://github.com/jangomeze",
    kind: "lucide" as const,
  },
  {
    name: "LinkedIn",
    src: "/images/social-linkedin.svg",
    href: "https://www.linkedin.com/in/jan-gomez-escobar-83808b331/",
    kind: "image" as const,
  },
  {
    name: "X",
    src: "/images/social-x.svg",
    href: "https://x.com/jangomezee",
    kind: "image" as const,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@jangomezee?lang=es",
    kind: "reactIcon" as const,
  },
  {
    name: "YouTube",
    src: "/images/social-youtube.svg",
    href: "https://www.youtube.com/@jangomezee",
    kind: "image" as const,
  },
];

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-6 mt-6">
          {socialIcons.map((icon) => (
            <a
              key={icon.name}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.name}
              className="transition-opacity hover:opacity-75 text-[#BCBCBC]"
            >
              {icon.kind === "image" && icon.src && (
                <Image src={icon.src} alt={icon.name} width={24} height={24} />
              )}
              {icon.kind === "lucide" && <Github className="h-6 w-6" aria-hidden />}
              {icon.kind === "reactIcon" && <FaTiktok className="h-6 w-6" aria-hidden />}
            </a>
          ))}
        </div>
        <p className="mt-6">{t("footer.derechos")}</p>
      </div>
    </footer>
  );
};

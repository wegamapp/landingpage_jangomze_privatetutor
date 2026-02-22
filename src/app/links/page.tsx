"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const LINK_ITEMS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jan-gomez-escobar-83808b331/",
    ariaKey: "links.ariaLinkedIn",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@jangomezee?lang=es",
    ariaKey: "links.ariaTikTok",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@jangomezee",
    ariaKey: "links.ariaYouTube",
  },
];

export default function LinksPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#EAEEFE] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <h1 className="text-xl font-semibold text-[#001738] mb-2">
          {t("links.pageTitle")}
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          {t("links.subtitle")}
        </p>
        <ul className="w-full flex flex-col gap-3">
          {LINK_ITEMS.map(({ label, href, ariaKey }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(ariaKey)}
                className="block w-full text-center rounded-xl border-2 border-[#001738] bg-white px-6 py-4 text-base font-semibold text-[#001738] transition-all duration-200 hover:bg-[#001738] hover:text-white active:scale-[0.98]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-6 text-sm text-[#3B82F6] font-medium hover:underline"
        >
          ← {t("links.backToHome")}
        </Link>
      </div>
    </main>
  );
}

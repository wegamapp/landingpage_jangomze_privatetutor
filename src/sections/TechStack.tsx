"use client";

import Image, { type StaticImageData } from "next/image";
import ankiLogo from "@/assets/logo-anki.png";
import notionLogo from "@/assets/logo-notion.png";
import pythonLogo from "@/assets/logo-python.png";
import sqlLogo from "@/assets/logo-SQL.png";
import tensorFlowLogo from "@/assets/logo-tensor_flow.png";
import cLogo from "@/assets/logo-C.png";
import cppLogo from "@/assets/logo-C++.png";
import { useLanguage } from "@/contexts/LanguageContext";

type StackItem = { name: string; logo?: StaticImageData };

const LANGUAGES: StackItem[] = [
  { name: "Python", logo: pythonLogo },
  { name: "C", logo: cLogo },
  { name: "C++", logo: cppLogo },
  { name: "SQL", logo: sqlLogo },
  { name: "TypeScript" },
];

const FRAMEWORKS: StackItem[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TensorFlow", logo: tensorFlowLogo },
  { name: "Tailwind CSS" },
  { name: "Framer Motion" },
];

const TOOLS: StackItem[] = [
  { name: "Notion", logo: notionLogo },
  { name: "Anki", logo: ankiLogo },
  { name: "Git" },
  { name: "Statsig" },
];

function StackGrid({ items }: { items: StackItem[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white border border-[#F1F1F1] px-4 py-6 shadow-sm min-h-[120px]"
        >
          {item.logo ? (
            <Image src={item.logo} alt="" className="h-10 w-auto object-contain" />
          ) : (
            <span className="h-10 flex items-center text-2xl font-bold text-[#001738]">
              {item.name.slice(0, 2)}
            </span>
          )}
          <span className="text-sm font-semibold text-[#001738] text-center">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export const TechStack = () => {
  const { t } = useLanguage();

  return (
    <section id="stack" className="scroll-mt-32 py-24 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="section-title text-3xl md:text-5xl">{t("techStack.title")}</h2>
          <p className="section-des mt-4">{t("techStack.subtitle")}</p>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-bold text-[#001738] mb-4">{t("techStack.languages")}</h3>
            <StackGrid items={LANGUAGES} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#001738] mb-4">{t("techStack.frameworks")}</h3>
            <StackGrid items={FRAMEWORKS} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#001738] mb-4">{t("techStack.tools")}</h3>
            <StackGrid items={TOOLS} />
          </div>
        </div>
      </div>
    </section>
  );
};

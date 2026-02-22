"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProductShowcase = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const features = [
    {
      emoji: "🧠",
      title: t("productShowcase.aprendeMejor.titulo"),
      text: t("productShowcase.aprendeMejor.texto"),
    },
    {
      emoji: "📝",
      title: t("productShowcase.tomaNotas.titulo"),
      text: t("productShowcase.tomaNotas.texto"),
    },
    {
      emoji: "⏰",
      title: t("productShowcase.creaHabitos.titulo"),
      text: t("productShowcase.creaHabitos.texto"),
    },
    {
      emoji: "📊",
      title: t("productShowcase.mideProgreso.titulo"),
      text: t("productShowcase.mideProgreso.texto"),
    }  
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="flex justify-center">
            <div className="tag">{t("productShowcase.tag")}</div>
          </div>

          <h2 className="text-2xl md:text-[42px] md:leading-[48px] font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            {t("productShowcase.titulo")}{" "}
            <span className="underline decoration-[#3B82F6] decoration-4 underline-offset-4">
              {t("productShowcase.todasAreas")}
            </span>
            .
          </h2>
        </div>

        {/* 🔹 BLOQUE DE TARJETAS */}
        <motion.div
          style={{ translateY }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-[#f3f5f8] p-10 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-3 hover:bg-[#001738] hover:shadow-2xl"
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl group-hover:bg-[#001738] group-hover:text-white transition-colors duration-300">
                  {item.emoji}
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

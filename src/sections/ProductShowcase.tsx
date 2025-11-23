"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const features = [
    {
      emoji: "🧠",
      title: "Aprende mejor",
      text: "Descubre cómo entender y retener información con nuevas técnicas diarias, científicamente validadas.",
    },
    {
      emoji: "📝",
      title: "Toma notas efectivas",
      text: "Convierte tus apuntes en una herramienta real de aprendizaje y no solo de referencia.",
    },
    {
      emoji: "⏰",
      title: "Crea hábitos sólidos",
      text: "Descubre como formar rutinas que te impulsen a mejorar cada día y alcanzar tus objetivos académicos.",
    },
    {
      emoji: "📊",
      title: "Mide tu progreso",
      text: "Realiza test diarios, valida tus resultados y observa cómo evoluciona tu rendimiento para mejorar de forma constante.",
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
            <div className="tag">Aumenta tu productividad y eficacia</div>
          </div>

          <h2 className="text-2xl md:text-[42px] md:leading-[48px] font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5">
            Aprender a aprender: la habilidad que transforma{" "}
            <span className="underline decoration-[#3B82F6] decoration-4 underline-offset-4">
              todas las áreas de tu vida
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

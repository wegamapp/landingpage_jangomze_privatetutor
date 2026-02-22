"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";

const MethodologyTimeline = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setProgress(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      title: t("timeline.validacion.titulo"),
      description: t("timeline.validacion.descripcion"),
      image: "/images/active-recall.png",
      tech: t("timeline.validacion.tech"),
      objectContain: true,
    },
    {
      title: t("timeline.protocolo.titulo"),
      description: t("timeline.protocolo.descripcion"),
      image: "/images/feynman.png",
      tech: t("timeline.protocolo.tech"),
      objectContain: true,
    },
    {
      title: t("timeline.modelado.titulo"),
      description: t("timeline.modelado.descripcion"),
      image: "/images/visual-modelado.png",
      tech: t("timeline.modelado.tech")
    },
    {
      title: t("timeline.resolucion.titulo"),
      description: t("timeline.resolucion.descripcion"),
      image: "/images/resolucion.png",
      tech: t("timeline.resolucion.tech")
    },
    {
      title: t("timeline.validacionFeedback.titulo"),
      description: t("timeline.validacionFeedback.descripcion"),
      image: "/images/validacion.png",
      tech: t("timeline.validacionFeedback.tech")
    }
  ];

  const totalSteps = steps.length + 2;

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 font-sans">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-32 text-center text-gray-900 tracking-tight"
      >
        {t("timeline.titulo")}
      </motion.h2>

      <div ref={containerRef} className="relative">
        {/* Línea central con animación (solo desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200" style={{ top: 0, bottom: 0 }}>
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-blue-600 origin-top"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>
        <motion.div
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
          style={{
            top: useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 12px)"]),
          }}
        >
          <motion.div
            className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-y-1/2"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const stepProgress = index / (totalSteps - 1);
          const isVisible = progress >= stepProgress - 0.1;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0.3, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className={`relative mb-32 md:mb-48 flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start'}`}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0.5 }}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2"
                  >
                    {step.tech}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                </motion.div>
              </div>

              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10"
                style={{ top: `${(index / (totalSteps - 1)) * 100}%` }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
              </motion.div>

              <div className="w-full md:w-1/2 px-4 md:px-12 mt-6 md:mt-0 flex justify-center">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"
                    animate={{ opacity: isVisible ? 0.25 : 0.1 }}
                  />
                  <img
                    src={step.image}
                    alt={step.title}
                    className={`relative w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 aspect-video ${(step as { objectContain?: boolean }).objectContain ? "object-contain" : "object-cover"}`}
                  />
                </motion.div>
              </div>

              <div className="md:hidden absolute left-0 top-0 w-0.5 bg-gray-200 h-full -ml-2" />
            </motion.div>
          );
        })}

        {/* Métricas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-32 md:mb-48 flex flex-col md:flex-row items-center"
        >
          <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
            <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col md:items-start">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
                Analytics & Tracking
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("timeline.metricas.subtitulo")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("timeline.metricas.texto")}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10"
            style={{ top: `${(steps.length / (totalSteps - 1)) * 100}%` }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
          </motion.div>

          <div className="w-full md:w-1/2 px-4 md:px-12 mt-6 md:mt-0 flex justify-center">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img
                src="/images/feedback-metricas.png"
                alt={t("timeline.metricas.subtitulo")}
                className="relative w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 object-cover aspect-video"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Éxito garantizado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-32 md:mb-48 flex flex-col md:flex-row-reverse items-center"
        >
          <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-right">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col md:items-end md:text-right"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-2">
                Success Guaranteed
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("timeline.exito.titulo")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("timeline.exito.texto")}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10"
            style={{ top: `${((steps.length + 1) / (totalSteps - 1)) * 100}%` }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-5 h-5 bg-green-600 rounded-full border-4 border-white shadow-lg" />
          </motion.div>

          <div className="w-full md:w-1/2 px-4 md:px-12 mt-6 md:mt-0 flex justify-center">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="absolute -inset-1 bg-gradient-to-r from-green-200 to-green-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img
                src="/images/exito.png"
                alt={t("timeline.exito.titulo")}
                className="relative w-full max-w-sm rounded-2xl shadow-xl border border-gray-100 object-contain aspect-video"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MethodologyTimeline;

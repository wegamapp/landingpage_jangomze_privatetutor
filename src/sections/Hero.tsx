"use client";
import fotolateral from "@/assets/mirando_al_lateral.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RotatingTextCircle } from "@/components/RotatingTextCircle";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip relative"
      style={{
        background:
          "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
      }}
    >
      <div className="container">
        <div className="md:flex items-center justify-between">
          
          {/* ----------- TEXTO ----------- */}
          <div className="md:w-[478px]">
            <h2 className="text-lg md:text-xl font-bold text-black mt-2 tracking-wide">
              SOY JAN GÓMEZ ESCOBAR
            </h2>

            <div className="lg:w-2/3 md:w-full">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Aprende a estudiar de forma efectiva y alcanza la carrera de
                <span className="inline bg-blue-200 text-black px-0.5 py-0.5">
                  {" "}
                  tus sueños.
                </span>
              </h2>
            </div>

            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">
                Descubre cómo puedo ayudarte
              </button>
              <button className="btn btn-text flex gap-1">
                <span>Learn more</span>
              </button>
            </div>
          </div>

          {/* ----------- FOTO SOBRE RECTÁNGULO + CIRCULO DE TEXTO ----------- */}
          <div className="mt-20 md:mt-0 md:flex-1 flex justify-center md:justify-end relative">
            
            {/* Imagen sobre rectángulo */}
            <motion.div
              style={{ translateY }}
              className="
                relative 
                px-6 py-4
                rounded-2xl 
                backdrop-blur-md
                bg-white/20 
                shadow-lg 
                border border-white/30
                max-w-[450px] 
                flex 
                justify-center
              "
            >
              <motion.img
                src={fotolateral.src}
                width={630}
                height={630}
                alt="Foto lateral"
                className="rounded-xl -mb-20 md:-mb-40"
                initial={{ y: -143 }}
                animate={{ y: -143 }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};


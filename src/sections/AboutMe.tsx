"use client";
import Image from "next/image";

import fotolondres from "@/assets/fotolondres.jpg";
import fotosentadocontento from "@/assets/foto_sentado_sonriente.jpg";
import fotoestudio from "@/assets/fotoestudio.jpg";
import { FaCheck } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const getBlocks = (t: (key: string) => string) => [
  {
    title: t("aboutMe.sobreMi.titulo"),
    texts: [
      t("aboutMe.sobreMi.texto1"),
      t("aboutMe.sobreMi.texto2")
    ],
  },
  {
    title: t("aboutMe.experiencia.titulo"),
    texts: [
      t("aboutMe.experiencia.texto1"),
      t("aboutMe.experiencia.texto2")
    ],
  },
  {
    title: t("aboutMe.actualidad.titulo"),
    texts: [
      t("aboutMe.actualidad.texto1"),
      t("aboutMe.actualidad.texto2")
    ],
  }
];

// Lista de imágenes en el orden deseado
const images = [fotosentadocontento, fotoestudio, fotolondres];

export default function SobreMi() {
  const { t } = useLanguage();
  const blocks = getBlocks(t);
  
  return (
    <section className="min-h-screen bg-[#e8ebef] py-24 px-6">
      <div className="container mx-auto">
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-24">
          {t("aboutMe.titulo")}
        </h1>

        {blocks.map((block, index) => {
          const isContainerRight = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between mb-32 ${
                isContainerRight ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Contenedor blanco (mitad de ancho) */}
              <div className="bg-white p-10 rounded-3xl shadow-md w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-[#001738]">
                  {block.title}
                </h2>
                {block.texts.map((text, idx) => (
                  <p
                    key={idx}
                    className="text-gray-700 text-lg leading-relaxed mb-4 flex items-start"
                  >
                    <span className="inline-flex items-center mr-2 mt-1">
                      <span className="bg-[#3B82F6] text-white rounded-full p-1 mr-2">
                        <FaCheck size={14} />
                      </span>
                    </span>
                    {text}
                  </p>
                ))}
              </div>

              {/* Imagen correspondiente al bloque */}
              <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
                <Image
                  src={images[index]} // selecciona la imagen según el bloque
                  alt={`Imagen ${block.title}`}
                  className="w-96 h-auto rounded-2xl shadow-lg" // tamaño aumentado
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

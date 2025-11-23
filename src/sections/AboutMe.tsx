"use client";
import Image from "next/image";

import fotolondres from "@/assets/fotolondres.jpg";
import fotosentadocontento from "@/assets/foto_sentado_sonriente.jpg";
import fotoestudio from "@/assets/fotoestudio.jpg";
import { FaCheck } from "react-icons/fa";

const blocks = [
  {
    title: "Sobre mí",
    texts: [
      "Soy un apasionado de la libertad y, por ello, me entusiasma compartir todas las herramientas que me permiten vivirla plenamente: las matemáticas aplicadas, la educación y la tecnología. Desde que entré en la educación superior, he buscado formas de hacer que aprender sea más accesible, práctico y estimulante para todas las personas.",
      "Actualmente combino mi formación académica con proyectos orientados a democratizar la libertad financiera, de expresión y, sobre todo, de pensamiento. Mi objetivo es ayudar, especialmente a los estudiantes, a desarrollar su máximo potencial mediante metodologías innovadoras que hagan del aprendizaje una experiencia transformadora."
    ],
  },
  {
    title: "Mi experiencia",
    texts: [
      "He trabajado con diversidad de estudiantes de distintos niveles, aplicando estrategias personalizadas de aprendizaje y optimización del rendimiento académico.",
      "Mi objetivo es crear sistemas educativos más eficientes, que midan y potencien el progreso real de cada alumno. Con mucho trabajo si, pero siempre buscando adaptar la metodología al alumno, no el alumno a la metodología."
    ],
  },
  {
    title: "En la actualidad",
    texts: [
      "Sigo formándome en Matemáticas Computacionales, desarrollando proyectos de emprendimiento DEFI, finanzas y educativo y compartiendo contenido de valor para estudiantes en redes.",
      "Mi propósito es inspirar a otros a encontrar su mejor versión a través del conocimiento y la constancia."
    ],
  }
];

// Lista de imágenes en el orden deseado
const images = [fotosentadocontento, fotoestudio, fotolondres];

export default function SobreMi() {
  return (
    <section className="min-h-screen bg-[#e8ebef] py-24 px-6">
      <div className="container mx-auto">
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-24">
          Soy Jan Gómez Escobar, Estudiante de Matemáticas Computacionales,
          emprendedor y experto en educación.
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

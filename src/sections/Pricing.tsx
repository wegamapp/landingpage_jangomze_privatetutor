"use client";
import Image from "next/image";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import freeContentImg from "@/assets/youtube3dicon.png";
import methodologyImg from "@/assets/gorro_graduacion.png";
import resultsImg from "@/assets/trophy-front-color.png";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const helpBoxes = [
  {
    image: freeContentImg,
    title: "Contenido gratuito",
    text: "Descubre mi canal de YouTube con contenido <span class='text-[#3B82F6] font-semibold'>gratuito</span> para mejorar tus habilidades y rendimiento académico.",
    button: {
      label: "Mi canal de YouTube",
      url: "https://www.youtube.com/@jangomezee",
    },
  },
  {
    image: methodologyImg,
    title: "Metodología probada",
    text: "Aprende con una metodología <span class='text-[#3B82F6] font-semibold'>efectiva</span> que te garantiza <span class='text-[#3B82F6] font-semibold'>resultados concretos y duraderos</span> en tu aprendizaje. Domina técnicas de alto impacto como la <span class='font-semibold'>Feynman Technique</span>, <span class='font-semibold'>Spaced Repetition</span>, <span class='font-semibold'>Cornell Method</span> o <span class='font-semibold'>Mind Mapping</span> para potenciar tu estudio.",
    button: {
      label: "Mira las fuentes",
      pdf: "/Multiple_Bibliographies_study_techniques.pdf", // PDF en la carpeta public
      download: false, // si quieres descargar, pon true
    },
  },
  {
    image: resultsImg,
    title: "Adaptabilidad",
    text: `Como estudiante de <span class="text-blue-600 font-semibold">Matemáticas Computacionales</span> y apasionado de economía, empresa e historia, ofrezco un apoyo excepcional en estas materias y en las evaluadas en PAU y grados medios.  
Con una <span class="text-blue-600 font-semibold">media de 9,25 en bachillerato</span> y nivel <span class="text-blue-600 font-semibold">B2 de inglés</span>, te guío de forma práctica y personalizada para que aprendas, disfrutes y domines cada asignatura.`,
    button: null, // eliminamos el botón aquí
  }
];

export const Pricing = () => {
  const [userScore, setUserScore] = useState(6);
  const averageImprovement = 0.422;

  const projectedScore = () => {
    const b = 0.35;
    const t = userScore === 0 ? 0.1 : userScore;
    let newScore = 10 * Math.pow(t / 10, b);
    if (newScore > 10) newScore = 10;
    return parseFloat(newScore.toFixed(2));
  };

  const data = {
    labels: ["Tiempo 0", "Tiempo 1"],
    datasets: [
      {
        label: "Tu nota actual",
        data: [userScore, userScore],
        borderColor: "#F87171",
        backgroundColor: "#F87171",
        tension: 0.3,
      },
      {
        label: "Nota proyectada con metodología",
        data: [userScore, projectedScore()],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Proyección de nota usando técnicas de aprendizaje" },
    },
    scales: { y: { beginAtZero: true, max: 10 } },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#001738]">
          ¿Cómo te puedo ayudar?
        </h2>

        <div className="flex flex-col gap-12 md:gap-16">
          {helpBoxes.map(({ image, title, text, button }, index) => {
            const isReversed = index % 2 === 1;
            const isScoreBox = title === "Adaptabilidad";

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center bg-[#f3f5f8] p-8 md:p-10 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 mb-6 md:mb-0 ${
                    index === 0 ? "w-32 h-32 md:mr-12" : "w-48 h-48 md:mx-8"
                  }`}
                >
                  <Image src={image} alt={title} className="w-full h-full object-contain rounded-xl" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#001738]">{title}</h3>
                  <p
                    className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />

                  {isScoreBox && (
                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                      <div className="flex flex-col mb-4 md:mb-0">
                        <label className="font-semibold mb-2">Tu nota actual:</label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          step={0.1}
                          value={userScore}
                          onChange={(e) => setUserScore(parseFloat(e.target.value))}
                          className="border rounded px-3 py-1 w-24"
                        />
                        <p className="mt-2">
                          Nota proyectada: <strong>{projectedScore()}</strong> / 10
                        </p>
                        <p className="text-sm text-gray-500 italic mt-1">
                          * Esta función es una aproximación, modeliza el rendimiento como decreciente y aplica un improvement base inferido.
                        </p>
                      </div>

                      <div className="flex-1 max-w-md">
                        <Line data={data} options={options} />
                      </div>
                    </div>
                  )}

                  {button && button.label && (
                    <a
                      href={button.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={button.download}
                      className="inline-block bg-[#001738] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#002d6d] transition-colors mt-4"
                    >
                      {button.label}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

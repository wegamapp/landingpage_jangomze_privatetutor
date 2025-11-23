"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoContacto: "alumno", // alumno, padre, gestion
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Construir mensaje
  const mensaje = `
Hola, soy ${formData.nombre}.
Email: ${formData.email}
Teléfono: ${formData.telefono}
Tipo de contacto: ${formData.tipoContacto}

Mensaje:
${formData.mensaje}
`;

  // Enviar email al endpoint
  const emailRes = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!emailRes.ok) {
    alert("❌ Error enviando el correo. Reinicia la pagina.");
    return;
  }

  alert("✔ Mensaje enviado correctamente!");
};


  return (
    <section
      id="contacta"
      ref={sectionRef}
      className="scroll-mt-28 bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip relative"
    >
      <div className="container text-center relative">
        <div className="section-heading relative">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-8">
            Empieza a conseguir esos resultados
          </h2>

          {/* Imágenes animadas */}
          <motion.img
            src={starImage.src}
            alt="star image"
            width={360}
            className="absolute -left-[350px] -top-[137px] opacity-60"
            style={{ translateY }}
          />
          <motion.img
            src={springImage.src}
            alt="spring image"
            width={360}
            className="absolute -right-[331px] -top-[19px] opacity-60"
            style={{ translateY }}
          />
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-8 text-left"
        >
          {/* Nombre */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Teléfono */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Número de teléfono *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              placeholder="+34 612 345 678"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tipo de contacto */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Soy *
            </label>
            <select
              name="tipoContacto"
              value={formData.tipoContacto}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="alumno">Alumno</option>
              <option value="padre">Padre</option>
              <option value="gestion">Responsable académico / escuela</option>
            </select>
          </div>

          {/* Mensaje */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Mensaje *
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-8 py-3 flex items-center gap-2"
            >
              <span>Enviar</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

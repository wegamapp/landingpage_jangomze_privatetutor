"use client";
import Image from "next/image"; // Aseguramos la importación de Image
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

  // Estado para el manejo de mensajes (reemplazo de alert())
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Limpiar mensaje anterior

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
    try {
      const emailRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!emailRes.ok) {
        // Reemplazo de alert()
        setMessage({ type: 'error', text: "❌ Error enviando el correo. Reinicia la pagina." });
        console.error("Error en la respuesta del API:", emailRes.status);
        return;
      }

      // Reemplazo de alert()
      setMessage({ type: 'success', text: "✔ Mensaje enviado correctamente!" });
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoContacto: "alumno",
        mensaje: "",
      });

    } catch (error) {
      // Reemplazo de alert()
      setMessage({ type: 'error', text: "❌ Fallo de red. Inténtalo de nuevo más tarde." });
      console.error("Error al enviar el formulario:", error);
    }
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

          {/* Imágenes animadas (PNGs/JPGs mantienen su método de importación) */}
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
          {/* Mensaje de estado (reemplazo de alert) */}
          {message && (
            <div
              className={`p-4 mb-4 rounded-lg text-center font-semibold ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
              role="alert"
            >
              {message.text}
            </div>
          )}

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
              {/* SVG MODIFICADO a next/image */}
              <Image 
                src="/images/arrow-right.svg"
                alt="Flecha derecha"
                width={20} // Corresponde al h-5 w-5
                height={20} // Corresponde al h-5 w-5
                className="h-5 w-5" 
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
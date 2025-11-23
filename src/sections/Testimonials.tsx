"use client";
import avatar1 from "@/assets/profile-picture-Eric.png";
import avatar2 from "@/assets/profile-picture-Nil.webp";
import avatar3 from "@/assets/profile-picture-Nil.webp";
import avatar4 from "@/assets/profile-picture-Davud.png";
import avatar5 from "@/assets/profile-picture-Pol.png";
import avatar6 from "@/assets/profile-picture-janbo.png";
import avatar7 from "@/assets/profile-picture-Nil.webp";
import avatar8 from "@/assets/mariateresa-profile-picture.png";
import avatar9 from "@/assets/profile-picture-berni.png";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Sempre va estar disponible per resoldre els meus dubtes de qualsevol assignatura, fins i tot fora d'horari de classes i sempre es va adaptar a les meves necessitats. Super Recomanable",
    imageSrc: avatar1.src,
    name: "Eric ",
    username: "@eric",
  },
  {
    text: "Aquest es el segon curs que treballo amb ell. I he aconseguit anar aprovant les matemàtiques malgrat començar justet jajajja merciiiiii Jaaan.",
    imageSrc: avatar2.src,
    name: "Nil folqueres",
    username: "@Nilfoldun",
  },
  {
    text: "Inicialmente era un poco exceptico con la efectividad de los métodos que comentaba, creía que no era lo que necesitaba, sino poner más empeño. Peró mereció la pena darle la oportunidad.",
    imageSrc: avatar3.src,
    name: "Marcos Gutierrez",
    username: "@josemielpez",
  },
  {
    text: "Ha ayudado a mi Hijo a aprobar 2n de bachillerato y sacar la nota que necesitaba en bachillerato, muy buen profesor y siempre muy educado.",
    imageSrc: avatar4.src,
    name: "David Garcia",
    username: "@davidd1974",
  },
  {
    text: "Estoy estudiando relaciones laborales, inicialmente me había costado poder seguir el ritmo de memorización, peró un poco de hábito y empezar a usar anki como me has enseñado ha sido clave, graciaas.",
    imageSrc: avatar5.src,
    name: "Pol Moya",
    username: "@pol_mf",
  },
  {
    text: "Mooolt recomanable, els tests diaris, juntament amb el anki, m'ha ajudat a tenir un feeback constant per identificar les areas que necesitava treballar i ser més efectiu.",
    imageSrc: avatar6.src,
    name: "Jan Bonhora",
    username: "@janboooo04",
  },
  {
    text: "Amb ell al seu costat mentre estudiava 2n de batxillerat he aconesguit després de suspendre 4 assignatures el primer trimestre, acabar aprovant-ho tot sense anar a recuuus. Moltes gràcies Jaaaan, les teves explicacions i els mindmaps eren just el que necesitava, no podría haver-ho fet sense tuuu!",
    imageSrc: avatar7.src,
    name: "Marcel",
    username: "@Marcel_cas07",
  },
  {
    text: "Muchas gracias Jan por ayudar tanto al Pol quedamos muy contentos :)",
    imageSrc: avatar8.src,
    name: "Maria Teresa",
    username: "@mariiiiteree75",
  },
  {
    text: "No estaba seguro de que necesitara cambiar mi forma de trabajar pero al final no solo me ha ayudado a entenderlo todo sino a ser más productivo, grandeee Jaaaan jajajaj.",
    imageSrc: avatar9.src,
    name: "Bernat Martin",
    username: "@berniifn",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username }) => (
              <div className="card bg-gray-50 p-4 rounded-lg shadow" key={username}>
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <Image
                    width={40}
                    height={40}
                    src={imageSrc}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">{name}</div>
                    <div className="leading-5 tracking-tight text-gray-500">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <section className="bg-white pt-24"> {/* Más espacio superior */}
      <div className="container mx-auto">
        <div className="section-heading mb-12">
          <div className="flex justify-center">
            <div className="tag">Testimonials</div>
          </div>

          <h2 className="section-title mt-5 text-center">
            Lee lo que dicen las personas que confiaron en mi
          </h2>
          <p className="section-des mt-5 text-center">
            Para entrar en tu carrera soñada o aprobar ese grado medio, lo verdaderamente importante, es que acabes siendo independiente.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10 max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};


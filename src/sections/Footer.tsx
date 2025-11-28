import logo from "@/assets/firma.jpeg";
// ELIMINADAS: Las siguientes importaciones directas de SVG han sido reemplazadas
// import SocialX from "@/assets/social-x.svg";
// import SocialInsta from "@/assets/social-insta.svg";
// import SocialLinkedin from "@/assets/social-linkedin.svg";
// import SocialPin from "@/assets/social-pin.svg";
// import SocialYoutube from "@/assets/social-youtube.svg";
import Image from "next/image";

// Definimos los datos de los iconos sociales para una fácil iteración
const socialIcons = [
  { 
    name: "Instagram", 
    src: "/images/social-insta.svg", 
    href: "https://instagram.com/tu_usuario" 
  },
  { 
    name: "LinkedIn", 
    src: "/images/social-linkedin.svg", 
    href: "https://linkedin.com/in/tu_usuario" 
  },
  { 
    name: "YouTube", 
    src: "/images/social-youtube.svg", 
    href: "https://youtube.com/tu_canal" 
  },
  // Si deseas agregar X/Twitter o Pinterest más tarde, puedes descomentar:
  // { name: "X (Twitter)", src: "/images/social-x.svg", href: "https://x.com/tu_usuario" },
  // { name: "Pinterest", src: "/images/social-pin.svg", href: "https://pinterest.com/tu_usuario" },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          {/* Puedes añadir enlaces de navegación aquí si es necesario */}
        </nav>

        <div className="flex justify-center gap-6 mt-6">
          {socialIcons.map((icon) => (
            <a 
              key={icon.name}
              href={icon.href} 
              target="_blank" 
              rel="noopener noreferrer"
              // Agregamos clases para un efecto visual de hover discreto
              className="transition-opacity hover:opacity-75"
            >
              {/* Uso de next/image para el SVG */}
              <Image
                src={icon.src}
                alt={`Icono de ${icon.name}`}
                width={24} // Tamaño estándar para iconos sociales (corresponde a h-6 w-6)
                height={24}
              />
            </a>
          ))}
        </div>
        
        {/* Nota: La imagen de logo importada (firma.jpeg) no se usa en este JSX, pero se mantiene la importación */}
        
        <p className="mt-6">&copy; 2025 jangomeze, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
import Logo from "@/assets/firma.jpeg";
// ELIMINADAS: import ArrowRight from "@/assets/arrow-right.svg";
// ELIMINADAS: import MenuIcon from "@/assets/menu.svg";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20 bg-white shadow-sm">
      {/* Barra superior con tu nombre */}
      <div className="flex justify-end items-center py-2 px-6 bg-gray-100 text-black text-sm">
        <p className="font-medium">Jan Gómez Escobar</p>
      </div>

      {/* Barra principal */}
      <div className="py-5">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Image src={Logo} alt="Logo Jan Gómez Escobar" height={80} width={80} />

          {/* Menú para móviles - MODIFICADO A next/image */}
          <Image 
            src="/images/menu.svg" 
            alt="Icono de Menú" 
            width={20} // Corresponde a h-5 w-5
            height={20} // Corresponde a h-5 w-5
            className="h-5 w-5 md:hidden" 
          />

          {/* Navegación */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#inicio" className="text-black/80 hover:text-black font-medium">
              Inicio
            </a>

            <a href="#sobremi" className="text-black/80 hover:text-black font-medium">
              Sobre mí
            </a>

            <a
              href="#contacta"
              className="bg-[#001738] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center gap-1"
            >
              <span>Descubre cómo puedo ayudarte</span>
              {/* ArrowRight - MODIFICADO A next/image */}
              <Image 
                src="/images/arrow-right.svg" 
                alt="Flecha" 
                width={16} // Corresponde a h-4 w-4
                height={16} // Corresponde a h-4 w-4
                className="h-4 w-4 inline-flex" 
              />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
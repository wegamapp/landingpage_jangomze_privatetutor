import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/firma.jpeg";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";

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

          {/* Menú para móviles */}
          <MenuIcon className="h-5 w-5 md:hidden" />

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
              Descubre cómo puedo ayudarte
              <ArrowRight className="h-4 w-4 inline-flex" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};


"use client";
import Logo from "@/assets/firma.jpeg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Header = () => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isTimelinePage = pathname === "/timeline";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20 bg-white shadow-sm">
      {/* Barra superior con tu nombre y selector de idiomas */}
      <div className="flex justify-between items-center py-2 px-6 bg-gray-100 text-black text-sm">
        <LanguageSelector />
        <p className="font-medium">Jan Gómez Escobar</p>
      </div>

      {/* Barra principal */}
      <div className="py-5">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/">
              <Image src={Logo} alt="Logo Jan Gómez Escobar" height={80} width={80} />
            </Link>
          </motion.div>

          {/* Menú para móviles - botón que abre el drawer */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -m-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label={t("header.inicio")}
            aria-expanded={mobileMenuOpen}
          >
            <Image 
              src="/images/menu.svg" 
              alt="Abrir menú" 
              width={20}
              height={20}
              className="h-5 w-5" 
            />
          </button>

          {/* Navegación */}
          <nav className="hidden md:flex gap-6 items-center">
            {isTimelinePage ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/#inicio" className="text-black/80 hover:text-black font-medium transition-colors">
                    {t("header.inicio")}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/#sobremi" className="text-black/80 hover:text-black font-medium transition-colors">
                    {t("header.sobreMi")}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/timeline" className="text-black/80 hover:text-black font-medium transition-colors">
                    {t("header.metodologia")}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/#contacta" className="bg-[#001738] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center gap-1 transition-all duration-300 hover:bg-[#002d6d] shadow-md hover:shadow-lg">
                    <span>{t("header.descubreAyuda")}</span>
                    <Image 
                      src="/images/arrow-right.svg" 
                      alt="Flecha" 
                      width={16}
                      height={16}
                      className="h-4 w-4 inline-flex" 
                    />
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.a
                  href="#inicio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-black/80 hover:text-black font-medium transition-colors"
                >
                  {t("header.inicio")}
                </motion.a>

                <motion.a
                  href="#sobremi"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-black/80 hover:text-black font-medium transition-colors"
                >
                  {t("header.sobreMi")}
                </motion.a>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/timeline" className="text-black/80 hover:text-black font-medium transition-colors">
                    {t("header.metodologia")}
                  </Link>
                </motion.div>

                <motion.a
                  href="#contacta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#001738] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center gap-1 transition-all duration-300 hover:bg-[#002d6d] shadow-md hover:shadow-lg"
                >
                  <span>{t("header.descubreAyuda")}</span>
                  <Image 
                    src="/images/arrow-right.svg" 
                    alt="Flecha" 
                    width={16}
                    height={16}
                    className="h-4 w-4 inline-flex" 
                  />
                </motion.a>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile drawer / overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-full max-w-sm bg-white shadow-xl md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <span className="font-medium text-black">Menú</span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-2">
                {isTimelinePage ? (
                  <>
                    <Link href="/#inicio" onClick={closeMobileMenu} className="py-3 px-4 text-black/80 hover:text-black font-medium rounded-lg hover:bg-gray-100">
                      {t("header.inicio")}
                    </Link>
                    <Link href="/#sobremi" onClick={closeMobileMenu} className="py-3 px-4 text-black/80 hover:text-black font-medium rounded-lg hover:bg-gray-100">
                      {t("header.sobreMi")}
                    </Link>
                    <Link href="/timeline" onClick={closeMobileMenu} className="py-3 px-4 text-black/80 hover:text-black font-medium rounded-lg hover:bg-gray-100">
                      {t("header.metodologia")}
                    </Link>
                    <Link href="/#contacta" onClick={closeMobileMenu} className="mt-2 py-3 px-4 bg-[#001738] text-white rounded-lg font-medium text-center inline-flex items-center justify-center gap-1 hover:bg-[#002d6d]">
                      <span>{t("header.descubreAyuda")}</span>
                      <Image src="/images/arrow-right.svg" alt="" width={16} height={16} className="h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <a href="#inicio" onClick={closeMobileMenu} className="py-3 px-4 text-black/80 hover:text-black font-medium rounded-lg hover:bg-gray-100">
                      {t("header.inicio")}
                    </a>
                    <a href="#sobremi" onClick={closeMobileMenu} className="py-3 px-4 text-black/80 hover:text-black font-medium rounded-lg hover:bg-gray-100">
                      {t("header.sobreMi")}
                    </a>
                    <Link href="/timeline" onClick={closeMobileMenu} className="py-3 px-4 text-black/80 hover:text-black font-medium rounded-lg hover:bg-gray-100">
                      {t("header.metodologia")}
                    </Link>
                    <a href="#contacta" onClick={closeMobileMenu} className="mt-2 py-3 px-4 bg-[#001738] text-white rounded-lg font-medium text-center inline-flex items-center justify-center gap-1 hover:bg-[#002d6d]">
                      <span>{t("header.descubreAyuda")}</span>
                      <Image src="/images/arrow-right.svg" alt="" width={16} height={16} className="h-4 w-4" />
                    </a>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
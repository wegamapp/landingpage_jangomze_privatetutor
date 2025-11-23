"use client";

import ankiLogo from "@/assets/logo-anki.png";
import notionLogo from "@/assets/logo-notion.png";
import pythonLogo from "@/assets/logo-python.png";
import sqlLogo from "@/assets/logo-sql.png";
import tensorFlowLogo from "@/assets/logo-tensor_flow.png";
import cLogo from "@/assets/logo-C.png";
import cppLogo from "@/assets/logo-C++.png"; 

import { motion } from "framer-motion";
import Image from "next/image";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div
          className="flex overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black, transparent)" }}
        >
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 25, // un poco más lento por más logos
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* Logos — primer bloque */}
            <Image src={ankiLogo} alt="Anki logo" className="logo-ticker-image" />
            <Image src={notionLogo} alt="Notion logo" className="logo-ticker-image" />
            <Image src={pythonLogo} alt="Python logo" className="logo-ticker-image" />
            <Image src={sqlLogo} alt="SQL logo" className="logo-ticker-image" />
            <Image src={tensorFlowLogo} alt="TensorFlow logo" className="logo-ticker-image" />
            <Image src={cLogo} alt="C logo" className="logo-ticker-image" />
            <Image src={cppLogo} alt="C++ logo" className="logo-ticker-image" />

            {/* Logos — repetición para loop continuo */}
            <Image src={ankiLogo} alt="Anki logo" className="logo-ticker-image" />
            <Image src={notionLogo} alt="Notion logo" className="logo-ticker-image" />
            <Image src={pythonLogo} alt="Python logo" className="logo-ticker-image" />
            <Image src={sqlLogo} alt="SQL logo" className="logo-ticker-image" />
            <Image src={tensorFlowLogo} alt="TensorFlow logo" className="logo-ticker-image" />
            <Image src={cLogo} alt="C logo" className="logo-ticker-image" />
            <Image src={cppLogo} alt="C++ logo" className="logo-ticker-image" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
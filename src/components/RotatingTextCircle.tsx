"use client";
import { useEffect, useRef } from "react";

interface RotatingTextCircleProps {
  text: string;       // texto que se repite formando el anillo
  radius?: number;    // radio del círculo
  speed?: number;     // velocidad de rotación
}

export const RotatingTextCircle = ({
  text,
  radius = 150,
  speed = 2,
}: RotatingTextCircleProps) => {
  const circleRef = useRef<HTMLDivElement>(null);

  // Rotación continua
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      if (circleRef.current) {
        angle += speed / 60;
        circleRef.current.style.transform = `rotate(${angle}deg)`;
      }
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  // Dividir el texto en caracteres
  const chars = text.split("");

  return (
    <div
      ref={circleRef}
      className="relative"
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      {chars.map((char, i) => {
        const theta = (i / chars.length) * 2 * Math.PI; // ángulo de cada caracter
        const x = radius * Math.cos(theta);
        const y = radius * Math.sin(theta);
        return (
          <span
            key={i}
            className="absolute text-white font-bold text-sm"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${x}px, ${y}px) rotate(${theta + Math.PI / 2}rad)`,
              transformOrigin: "center center",
              whiteSpace: "pre",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

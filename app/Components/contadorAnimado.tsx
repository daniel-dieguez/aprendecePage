"use client";

import { useEffect, useRef, useState } from "react";

interface ContadorProps {
  valor: number;
  sufijo?: string;
  duracion?: number;
}

export default function ContadorAnimado({
  valor,
  sufijo = "",
  duracion = 1500,
}: ContadorProps) {
  const [numero, setNumero] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const yaAnimo = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !yaAnimo.current) {
          yaAnimo.current = true;
          const inicio = performance.now();

          const animar = (ahora: number) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            // easing para que desacelere al final
            const suavizado = 1 - Math.pow(1 - progreso, 3);
            setNumero(Math.floor(suavizado * valor));
            if (progreso < 1) requestAnimationFrame(animar);
          };

          requestAnimationFrame(animar);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [valor, duracion]);

  return (
    <span ref={ref}>
      {numero.toLocaleString("es-GT")}
      {sufijo}
    </span>
  );
}
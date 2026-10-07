"use client";

import { useState } from "react";

interface TextoDesplegableProps {
  parrafos: string[];
}

export default function TextoDesplegable({ parrafos }: TextoDesplegableProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <div
        className={`space-y-4 text-gray-600 leading-relaxed ${
          abierto ? "" : "line-clamp-4"
        }`}
      >
        {parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <button
        onClick={() => setAbierto(!abierto)}
        className="mt-3 text-sm font-medium text-gray-900 underline underline-offset-4"
      >
        {abierto ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import CitaModal from "../content/citaModal";

const CitaContext = createContext<{ abrir: () => void }>({ abrir: () => {} });

export function useCita() {
  return useContext(CitaContext);
}

// Envuelve la página: renderiza el formulario una sola vez
// y lo abre desde cualquier <CitaButton />.
export default function CitaProvider({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => setAbierto(false), []);

  return (
    <CitaContext.Provider value={{ abrir }}>
      {children}
      {abierto && <CitaModal onClose={cerrar} />}
    </CitaContext.Provider>
  );
}

// Botón que abre el formulario. Recibe las clases de Tailwind que quieras.
export function CitaButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { abrir } = useCita();
  return (
    <button type="button" onClick={abrir} className={className}>
      {children}
    </button>
  );
}
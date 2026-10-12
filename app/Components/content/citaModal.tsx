"use client";

import React, { useEffect, useRef, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { PAISES } from "../../Components/data/paises";  // misma ruta que usas en contacto
import {
  Datos,
  Entorno,
  VACIO,
  armarEnlaces,
  armarMensaje,
  detectarEntorno,
} from "../content/whatsApp";

// ─── Selector de países ─────────────────────────────────────
type OpcionPais = { value: string; label: string };

const opcionesPaises: OpcionPais[] = PAISES.map((pais) => ({
  value: pais.nombre,
  label: `${pais.bandera} ${pais.nombre}`,
}));

const estilosSelect: StylesConfig<OpcionPais, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 12,
    borderColor: state.isFocused ? "#6f8f82" : "#e7ece9",
    backgroundColor: state.isFocused ? "#fff" : "#fbfcfb",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": { borderColor: "#6f8f82" },
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 14px" }),
  input: (base) => ({ ...base, fontSize: 16, color: "#2f3a36" }),
  placeholder: (base) => ({ ...base, color: "#7b8782", fontSize: 16 }),
  singleValue: (base) => ({ ...base, color: "#2f3a36", fontSize: 16 }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#7b8782" }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #e7ece9",
    boxShadow: "0 12px 30px rgba(47, 58, 54, 0.12)",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 100 }),
  option: (base, state) => ({
    ...base,
    fontSize: 15,
    cursor: "pointer",
    color: "#2f3a36",
    backgroundColor: state.isSelected
      ? "#dfe9e4"
      : state.isFocused
      ? "#f1f5f3"
      : "#fff",
    "&:active": { backgroundColor: "#dfe9e4" },
  }),
  noOptionsMessage: (base) => ({ ...base, color: "#7b8782", fontSize: 14 }),
};

const css = `
.cita {
  --ink: #2f3a36;
  --muted: #7b8782;
  --accent: #6f8f82;
  --line: #e7ece9;
  --bg: #fbfcfb;
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(47, 58, 54, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--ink);
  animation: cita-fade 0.2s ease;
}
@keyframes cita-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes cita-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.cita__modal {
  width: 100%;
  max-width: 460px;
  max-height: 92vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 24px;
  padding: 28px 24px;
  box-shadow: 0 20px 60px rgba(47, 58, 54, 0.2);
  animation: cita-in 0.25s ease;
}
.cita__mhead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}
.cita__mtitle { font-size: 1.3rem; font-weight: 400; margin: 0; }
.cita__x {
  flex: none;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
}
.cita__x:hover { background: var(--line); }
.cita__msub { color: var(--muted); font-size: 0.9rem; margin: 0 0 20px; }
.cita__form { display: grid; gap: 16px; }
.cita__field { display: grid; gap: 6px; }
.cita__label { font-size: 0.85rem; color: var(--muted); }
.cita__input {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--bg);
  color: var(--ink);
  font-size: 16px; /* evita el zoom en iPhone */
  font-family: inherit;
  transition: border-color 0.2s, background 0.2s;
}
.cita__input:focus { outline: none; border-color: var(--accent); background: #fff; }
.cita__textarea { resize: vertical; min-height: 92px; line-height: 1.5; }
.cita__error { font-size: 0.8rem; color: #b5574b; }
.cita__send {
  margin-top: 4px;
  padding: 14px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}
.cita__send:hover { background: #5d7a6e; }
.cita__legal { font-size: 0.78rem; color: var(--muted); margin: 0; text-align: center; }
.cita__aviso {
  margin: 0 0 20px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f1f5f3;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.5;
}
.cita__fallback {
  margin-top: 16px;
  padding: 16px;
  border: 1px dashed var(--line);
  border-radius: 16px;
  display: grid;
  gap: 10px;
  text-align: center;
  animation: cita-in 0.25s ease;
}
.cita__fallback p { margin: 0; font-size: 0.85rem; color: var(--muted); }
.cita__ghost {
  display: block;
  padding: 12px 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #fff;
  color: var(--ink);
  font-size: 0.92rem;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.cita__ghost:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 767px) {
  .cita { align-items: flex-end; padding: 0; }
  .cita__modal { border-radius: 24px 24px 0 0; max-width: none; }
}
@media (prefers-reduced-motion: reduce) {
  .cita, .cita__modal, .cita__fallback { animation: none; }
}
`;

export default function CitaModal({ onClose }: { onClose: () => void }) {
  const [datos, setDatos] = useState<Datos>(VACIO);
  const [entorno, setEntorno] = useState<Entorno | null>(null);
  const [intentado, setIntentado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [errorPais, setErrorPais] = useState(false);
  const primerCampo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEntorno(detectarEntorno());
  }, []);

  // Bloquea el scroll, enfoca el primer campo y cierra con Escape
  useEffect(() => {
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primerCampo.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const cambiar =
    (campo: keyof Datos) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDatos((d) => ({ ...d, [campo]: e.target.value }));

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!datos.pais) {
      setErrorPais(true);
      return;
    }

    const { web, app, intent } = armarEnlaces(armarMensaje(datos));

    // Navegador normal: abre WhatsApp y cierra el formulario
    if (!entorno?.enApp) {
      window.open(web, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }

    // Navegador interno de TikTok/Instagram/Facebook
    setIntentado(true);
    window.location.href = entorno.android ? intent : app;
  };

  const copiarMensaje = async () => {
    const texto = armarMensaje(datos);
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const area = document.createElement("textarea");
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const { web: enlaceWeb } = armarEnlaces(armarMensaje(datos));

  return (
    <div
      className="cita"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <style>{css}</style>

      <div
        className="cita__modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cita-titulo"
      >
        <div className="cita__mhead">
          <h2 id="cita-titulo" className="cita__mtitle">
            Cuéntame un poco de ti
          </h2>
          <button
            type="button"
            className="cita__x"
            aria-label="Cerrar"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="cita__msub">
          Con estos datos prepararé tu mensaje para WhatsApp.
        </p>

        {entorno?.enApp && (
          <p className="cita__aviso">
            Estás en el navegador de {entorno.nombreApp}. Si WhatsApp no se
            abre, toca <strong>⋯</strong> y elige{" "}
            <strong>“Abrir en el navegador”</strong>.
          </p>
        )}

        <form className="cita__form" onSubmit={enviar}>
          <label className="cita__field">
            <span className="cita__label">Nombre y apellido</span>
            <input
              ref={primerCampo}
              className="cita__input"
              type="text"
              name="nombre"
              autoComplete="name"
              required
              value={datos.nombre}
              onChange={cambiar("nombre")}
            />
          </label>

          <label className="cita__field">
            <span className="cita__label">País donde se encuentra</span>
            <Select<OpcionPais, false>
              instanceId="select-pais-cita"
              inputId="pais-cita"
              name="pais"
              options={opcionesPaises}
              placeholder="Busca un país..."
              isSearchable
              value={opcionesPaises.find((p) => p.value === datos.pais) || null}
              onChange={(opcion) => {
                setDatos((d) => ({ ...d, pais: opcion?.value ?? "" }));
                setErrorPais(false);
              }}
              noOptionsMessage={() => "No se encontraron países"}
              styles={estilosSelect}
              menuPortalTarget={
                typeof document !== "undefined" ? document.body : null
              }
              menuPlacement="auto"
            />
            {errorPais && (
              <span className="cita__error">Selecciona tu país</span>
            )}
          </label>

          <label className="cita__field">
            <span className="cita__label">Edad</span>
            <input
              className="cita__input"
              type="number"
              name="edad"
              inputMode="numeric"
              min={1}
              max={120}
              required
              value={datos.edad}
              onChange={cambiar("edad")}
            />
          </label>

          <label className="cita__field">
            <span className="cita__label">Profesión o estudios (opcional)</span>
            <input
              className="cita__input"
              type="text"
              name="profesion"
              value={datos.profesion}
              onChange={cambiar("profesion")}
            />
          </label>

          <label className="cita__field">
            <span className="cita__label">
              ¿Cuál es el motivo de tu consulta?
            </span>
            <textarea
              className="cita__input cita__textarea"
              name="motivo"
              required
              maxLength={400}
              placeholder="Cuéntame brevemente qué te gustaría trabajar"
              value={datos.motivo}
              onChange={cambiar("motivo")}
            />
          </label>

          <button type="submit" className="cita__send">
            Enviar por WhatsApp
          </button>
          <p className="cita__legal">
            Tus datos solo se usan para armar el mensaje; no se guardan.
          </p>
        </form>

        {entorno?.enApp && intentado && (
          <div className="cita__fallback" role="status">
            <p>¿No se abrió WhatsApp? Prueba una de estas opciones:</p>
            <a
              className="cita__ghost"
              href={enlaceWeb}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir con enlace alternativo
            </a>
            <button
              type="button"
              className="cita__ghost"
              onClick={copiarMensaje}
            >
              {copiado ? "¡Mensaje copiado!" : "Copiar mensaje"}
            </button>
            {copiado && <p>Ahora abre WhatsApp, entra a mi chat y pégalo.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
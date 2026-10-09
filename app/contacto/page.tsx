"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Select, { StylesConfig } from "react-select";
import { PAISES } from "../Components/data/paises"; // ← ajusta la ruta a donde tengas tu data

// ─── Datos (edita solo esto) ────────────────────────────────
const TELEFONO = "50255162181";

const OPCIONES = [
  {
    titulo: "Deseo terapia para mí mismo/a",
    motivo:
      "estoy interesado/a en iniciar terapia psicológica individual con usted.",
  },
  {
    titulo: "Busco terapia en pareja",
    motivo: "estoy interesado/a en iniciar terapia de pareja con usted.",
  },
  {
    titulo: "Busco ayuda para llevar de mejor forma mis emociones",
    motivo:
      "busco ayuda para manejar de mejor forma mis emociones y me gustaría recibir su orientación.",
  },
  {
    titulo: "Busco apoyo emocional para alguien",
    motivo:
      "busco apoyo emocional para una persona cercana y me gustaría recibir su orientación.",
  },
];
// ────────────────────────────────────────────────────────────

type Datos = {
  nombre: string;
  pais: string;
  edad: string;
  profesion: string;
};

const VACIO: Datos = { nombre: "", pais: "", edad: "", profesion: "" };

// ─── Selector de países ─────────────────────────────────────
type OpcionPais = { value: string; label: string };

// Se calcula una sola vez (fuera del componente)
const opcionesPaises: OpcionPais[] = PAISES.map((pais) => ({
  value: pais.nombre,
  label: `${pais.bandera} ${pais.nombre}`,
}));

// Estilos de react-select para que combine con el resto del formulario
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
  input: (base) => ({ ...base, fontSize: 16, color: "#2f3a36" }), // 16px evita zoom en iPhone
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
  // El menú se dibuja fuera del modal, así que debe quedar por encima de él
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

function armarMensaje(motivo: string, d: Datos) {
  let mensaje =
    `¡Hola Lic! Vi su perfil en redes sociales y ${motivo}\n\n` +
    `Mi nombre es ${d.nombre.trim()},\n\n` +
    `Soy de ${d.pais.trim()}\n\n` +
    `Tengo ${d.edad.trim()} años.`;

  if (d.profesion.trim()) {
    mensaje += `\n\nActualmente, tengo estudios en ${d.profesion.trim()}.`;
  }

  return mensaje;
}

// Enlaces según cómo se quiera abrir WhatsApp
function armarEnlaces(mensaje: string) {
  const texto = encodeURIComponent(mensaje);

  // Página web de WhatsApp (funciona en cualquier navegador; sirve de respaldo)
  const web = `https://api.whatsapp.com/send?phone=${TELEFONO}&text=${texto}`;

  // Abre directamente la app de WhatsApp (iPhone y Android)
  const app = `whatsapp://send?phone=${TELEFONO}&text=${texto}`;

  // Android: obliga al sistema a abrir la app; si no la tiene, usa la web
  const intent =
    `intent://send?phone=${TELEFONO}&text=${texto}` +
    `#Intent;scheme=whatsapp;package=com.whatsapp;` +
    `S.browser_fallback_url=${encodeURIComponent(web)};end`;

  return { web, app, intent };
}

type Entorno = {
  enApp: boolean; // TikTok, Instagram, Facebook... (navegador interno)
  android: boolean;
  ios: boolean;
  nombreApp: string;
};

function detectarEntorno(): Entorno {
  const ua = navigator.userAgent || "";
  const tiktok = /musical_ly|BytedanceWebview|TikTok|trill|Bytedance/i.test(ua);
  const instagram = /Instagram/i.test(ua);
  const facebook = /FBAN|FBAV|FB_IAB/i.test(ua);

  return {
    enApp: tiktok || instagram || facebook,
    android: /Android/i.test(ua),
    ios: /iPhone|iPad|iPod/i.test(ua),
    nombreApp: tiktok ? "TikTok" : instagram ? "Instagram" : "Facebook",
  };
}

const css = `
.cont {
  --ink: #2f3a36;
  --muted: #7b8782;
  --accent: #6f8f82;
  --line: #e7ece9;
  --bg: #fbfcfb;
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  padding: 72px 20px;
  font-family: inherit;
}
.cont__wrap { max-width: 560px; margin: 0 auto; }
.cont__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 12px;
}
.cont__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 12px;
}
.cont__lead { color: var(--muted); margin: 0 0 32px; line-height: 1.6; }

.cont__toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 22px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}
.cont__toggle:hover { background: #5d7a6e; }
.cont__chev { transition: transform 0.25s; }
.cont__toggle[aria-expanded="true"] .cont__chev { transform: rotate(180deg); }

.cont__list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
  animation: cont-in 0.3s ease;
}
@keyframes cont-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.cont__opt {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font-size: 1rem;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
}
.cont__opt:hover { border-color: var(--accent); transform: translateY(-1px); }
.cont__num {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--accent);
  font-size: 0.85rem;
  display: grid;
  place-items: center;
}
.cont__back { margin-top: 40px; }

/* ── Modal ── */
.cont__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(47, 58, 54, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: cont-fade 0.2s ease;
}
@keyframes cont-fade { from { opacity: 0; } to { opacity: 1; } }
.cont__modal {
  width: 100%;
  max-width: 460px;
  max-height: 92vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 24px;
  padding: 28px 24px;
  box-shadow: 0 20px 60px rgba(47, 58, 54, 0.2);
  animation: cont-in 0.25s ease;
}
.cont__mhead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}
.cont__mtitle { font-size: 1.3rem; font-weight: 400; margin: 0; }
.cont__x {
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
.cont__x:hover { background: var(--line); }
.cont__msub { color: var(--muted); font-size: 0.9rem; margin: 0 0 20px; }
.cont__selected {
  font-size: 0.85rem;
  color: var(--accent);
  margin: 0 0 20px;
}
.cont__form { display: grid; gap: 16px; }
.cont__field { display: grid; gap: 6px; }
.cont__label { font-size: 0.85rem; color: var(--muted); }
.cont__input {
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
.cont__error { font-size: 0.8rem; color: #b5574b; }
.cont__input:focus {
  outline: none;
  border-color: var(--accent);
  background: #fff;
}
.cont__send {
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
.cont__send:hover { background: #5d7a6e; }
.cont__legal { font-size: 0.78rem; color: var(--muted); margin: 0; text-align: center; }
.cont__aviso {
  margin: 0 0 20px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f1f5f3;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.5;
}
.cont__fallback {
  margin-top: 16px;
  padding: 16px;
  border: 1px dashed var(--line);
  border-radius: 16px;
  display: grid;
  gap: 10px;
  text-align: center;
  animation: cont-in 0.25s ease;
}
.cont__fallback p { margin: 0; font-size: 0.85rem; color: var(--muted); }
.cont__ghost {
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
.cont__ghost:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 767px) {
  .cont { padding: 48px 20px; }
  .cont__overlay { align-items: flex-end; padding: 0; }
  .cont__modal { border-radius: 24px 24px 0 0; max-width: none; }
}
@media (prefers-reduced-motion: reduce) {
  .cont__list, .cont__overlay, .cont__modal { animation: none; }
  .cont__opt, .cont__chev { transition: none; }
}
`;

export default function Contacto() {
  const [abierto, setAbierto] = useState(false);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [datos, setDatos] = useState<Datos>(VACIO);
  const primerCampo = useRef<HTMLInputElement>(null);

  const [entorno, setEntorno] = useState<Entorno | null>(null);
  const [intentado, setIntentado] = useState(false); // ya se intentó abrir WhatsApp
  const [copiado, setCopiado] = useState(false);
  const [errorPais, setErrorPais] = useState(false);

  // Detectar desde dónde se abrió la página (solo en el navegador)
  useEffect(() => {
    setEntorno(detectarEntorno());
  }, []);

  const cerrar = () => {
    setSeleccion(null);
    setIntentado(false);
    setCopiado(false);
    setErrorPais(false);
  };

  // Bloquea el scroll, enfoca el primer campo y cierra con Escape
  useEffect(() => {
    if (seleccion === null) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primerCampo.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKey);
    };
  }, [seleccion]);

  const cambiar =
    (campo: keyof Datos) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setDatos((d) => ({ ...d, [campo]: e.target.value }));

  const mensajeActual = () =>
    seleccion === null ? "" : armarMensaje(OPCIONES[seleccion].motivo, datos);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (seleccion === null) return;

    // react-select no valida "required" por sí solo en todos los navegadores
    if (!datos.pais) {
      setErrorPais(true);
      return;
    }

    const { web, app, intent } = armarEnlaces(mensajeActual());

    // Navegador normal (Chrome, Safari, computadora...): como antes
    if (!entorno?.enApp) {
      window.open(web, "_blank", "noopener,noreferrer");
      setDatos(VACIO);
      cerrar();
      return;
    }

    // Navegador interno de TikTok/Instagram/Facebook: intentar abrir la app
    setIntentado(true);

    if (entorno.android) {
      // Abre la app; si no puede, Android usa la web por su cuenta
      window.location.href = intent;
    } else {
      // iPhone: esquema directo a la app
      window.location.href = app;
    }
  };

  const copiarMensaje = async () => {
    const texto = mensajeActual();
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Respaldo para navegadores que bloquean el portapapeles
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

  const { web: enlaceWeb } = armarEnlaces(mensajeActual());

  return (
    <section id="contacto" className="cont">
      <style>{css}</style>

      <div className="cont__wrap">
        <p className="cont__eyebrow">Contacto</p>
        <h1 className="cont__title">Estoy aquí para escucharte</h1>
        <p className="cont__lead">
          Dar el primer paso es lo más importante. Cuéntame qué buscas y te
          responderé por WhatsApp.
        </p>

        <button
          type="button"
          className="cont__toggle"
          aria-expanded={abierto}
          aria-controls="cont-opciones"
          onClick={() => setAbierto((v) => !v)}
        >
          <span>¿Desea solicitar más información?</span>
          <span className="cont__chev" aria-hidden="true">
            ▾
          </span>
        </button>

        {abierto && (
          <ul id="cont-opciones" className="cont__list">
            {OPCIONES.map((op, i) => (
              <li key={op.titulo}>
                <button
                  type="button"
                  className="cont__opt"
                  onClick={() => setSeleccion(i)}
                >
                  <span className="cont__num">{i + 1}</span>
                  <span>{op.titulo}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cont__back">
          <Link
            href="/home"
            className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-center text-gray-800 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            Regresar
          </Link>
        </div>
      </div>

      {seleccion !== null && (
        <div
          className="cont__overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) cerrar();
          }}
        >
          <div
            className="cont__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cont-modal-titulo"
          >
            <div className="cont__mhead">
              <h2 id="cont-modal-titulo" className="cont__mtitle">
                Cuéntame un poco de ti
              </h2>
              <button
                type="button"
                className="cont__x"
                aria-label="Cerrar"
                onClick={cerrar}
              >
                ×
              </button>
            </div>
            <p className="cont__msub">
              Con estos datos prepararé tu mensaje para WhatsApp.
            </p>
            <p className="cont__selected">{OPCIONES[seleccion].titulo}</p>

            {entorno?.enApp && (
              <p className="cont__aviso">
                Estás en el navegador de {entorno.nombreApp}. Si WhatsApp no se
                abre, toca <strong>⋯</strong> y elige{" "}
                <strong>“Abrir en el navegador”</strong>.
              </p>
            )}

            <form className="cont__form" onSubmit={enviar}>
              <label className="cont__field">
                <span className="cont__label">Nombre y apellido</span>
                <input
                  ref={primerCampo}
                  className="cont__input"
                  type="text"
                  name="nombre"
                  autoComplete="name"
                  required
                  value={datos.nombre}
                  onChange={cambiar("nombre")}
                />
              </label>

              <label className="cont__field">
                <span className="cont__label">País donde se encuentra</span>
                <Select<OpcionPais, false>
                  instanceId="select-pais"
                  inputId="pais"
                  name="pais"
                  options={opcionesPaises}
                  placeholder="Busca un país..."
                  isSearchable
                  value={
                    opcionesPaises.find((p) => p.value === datos.pais) || null
                  }
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
                  <span className="cont__error">Selecciona tu país</span>
                )}
              </label>

              <label className="cont__field">
                <span className="cont__label">Edad</span>
                <input
                  className="cont__input"
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

              <label className="cont__field">
                <span className="cont__label">
                  Profesión o estudios (opcional)
                </span>
                <input
                  className="cont__input"
                  type="text"
                  name="profesion"
                  value={datos.profesion}
                  onChange={cambiar("profesion")}
                />
              </label>

              <button type="submit" className="cont__send">
                Enviar por WhatsApp
              </button>
              <p className="cont__legal">
                Tus datos solo se usan para armar el mensaje; no se guardan.
              </p>
            </form>

            {entorno?.enApp && intentado && (
              <div className="cont__fallback" role="status">
                <p>¿No se abrió WhatsApp? Prueba una de estas opciones:</p>
                <a
                  className="cont__ghost"
                  href={enlaceWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir con enlace alternativo
                </a>
                <button
                  type="button"
                  className="cont__ghost"
                  onClick={copiarMensaje}
                >
                  {copiado ? "¡Mensaje copiado!" : "Copiar mensaje"}
                </button>
                {copiado && (
                  <p>Ahora abre WhatsApp, entra a mi chat y pégalo.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
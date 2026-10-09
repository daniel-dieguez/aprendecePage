import React from "react";
import Link from "next/link";

// ─── Datos (edita solo esto) ────────────────────────────────
const NOMBRE = "Aprendece Psicólogo";
const PLUS_CODE = "H759+GG Antigua Guatemala";
const DIRECCION = "2 Av Norte, Antigua Guatemala 03001";
const CIUDAD = "Antigua Guatemala, Sacatepéquez";
const LAT = 14.5587933;
const LNG = -90.7311953;
// Enlace oficial de la ficha en Google Maps
const MAPS_URL =
  "https://www.google.com/maps/place/Aprendece+Psic%C3%B3golo/@14.5587932,-90.7360609,17z/data=!3m1!4b1!4m6!3m5!1s0x85890f526a0a7809:0xf267ab4ae4db6afb!8m2!3d14.5587933!4d-90.7311953!16s%2Fg%2F11y43p5kjl";
// ────────────────────────────────────────────────────────────

const coords = `${LAT},${LNG}`;
const EMBED_URL = `https://www.google.com/maps?q=${coords}&z=17&output=embed`;
const RUTA_URL = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;

const css = `
.ubic {
  --ink: #2f3a36;
  --muted: #7b8782;
  --accent: #6f8f82;
  --line: #e7ece9;
  --bg: #fbfcfb;
  background: var(--bg);
  color: var(--ink);
  padding: 72px 20px;
  font-family: inherit;
}
.ubic__wrap {
  max-width: 1040px;
  margin: 0 auto;
  display: grid;
  gap: 32px;
  align-items: center;
}
.ubic__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 12px;
}
.ubic__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 20px;
}
.ubic__line {
  margin: 0 0 4px;
  font-size: 1.05rem;
}
.ubic__muted {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}
.ubic__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.ubic__btn {
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 0.92rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.ubic__btn--solid {
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);
}
.ubic__btn--solid:hover { background: #5d7a6e; border-color: #5d7a6e; }
.ubic__btn--ghost {
  color: var(--ink);
  border: 1px solid var(--line);
  background: #fff;
}
.ubic__btn--ghost:hover { border-color: var(--accent); color: var(--accent); }
.ubic__nav {
  max-width: 1040px;
  margin: 0 auto;
}
.ubic__map {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: 0 8px 30px rgba(47, 58, 54, 0.06);
}
.ubic__map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: grayscale(0.25) saturate(0.85);
}

/* Móvil: texto arriba, mapa abajo, botones a ancho completo */
@media (max-width: 767px) {
  .ubic { padding: 48px 20px; }
  .ubic__actions { flex-direction: column; }
  .ubic__btn { text-align: center; }
  .ubic__map { aspect-ratio: 1 / 1; border-radius: 16px; }
}

/* Escritorio: dos columnas */
@media (min-width: 768px) {
  .ubic__wrap { grid-template-columns: 1fr 1.2fr; gap: 56px; }
}
`;

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="ubic">
      <style>{css}</style>

      <div className="ubic__wrap">
        <div>
          <p className="ubic__eyebrow">Ubicación</p>
          <h2 className="ubic__title">Un espacio tranquilo para tu consulta</h2>

          <p className="ubic__line">{NOMBRE}</p>
          <p className="ubic__muted">{DIRECCION}</p>
          <p className="ubic__muted">{CIUDAD}</p>
          <p className="ubic__muted">Plus Code: {PLUS_CODE}</p>

          <div className="ubic__actions">
            <a
              className="ubic__btn ubic__btn--solid"
              href={RUTA_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar
            </a>
            <a
              className="ubic__btn ubic__btn--ghost"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>

        <div className="ubic__map">
          <iframe
            title={`Mapa de ${NOMBRE}`}
            src={EMBED_URL}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="ubic__nav">
        <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
          <Link
            href="/contacto"
            className="flex-1 rounded-full border border-gray-300 py-3 text-center text-gray-800 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            Contactarme
          </Link>
          <Link
            href="/home"
            className="flex-1 rounded-full border border-gray-300 py-3 text-center text-gray-800 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            Regresar
          </Link>
        </div>
      </div>
    </section>
  );
}
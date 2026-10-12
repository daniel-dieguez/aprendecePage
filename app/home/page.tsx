import Link from "next/link";
import Image from "next/image";
import perfil from "../Components/images/licenciado3.png"
import Reveal from "../Components/content/reveal";
import {
  FAQ, SERVICES, STEPS, SYMPTOMS
} from "../Components/content/content";
import CitaProvider, { CitaButton } from "../Components/content/citaProvider";

const SECONDARY = [
  { label: "Ubicación", href: "/ubicacion" },
  { label: "Saber más de mí", href: "/sobremi" },
];
 
export default function HomePage() {
  return (
    <CitaProvider>
    <div className="pb-24 text-[#2f3a36]">
      {/* HERO */}
      <section className="flex min-h-[85svh] flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#f1f5f3] to-white px-6 py-12">
        <Image
          src={perfil}
          alt="Luis Diéguez, psicólogo clínico"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full object-cover ring-4 ring-[#dfe9e4]"
          priority
        />
 
        <div className="text-center">
          <h1 className="text-3xl font-light">Hola, soy Luis Dieguez</h1>
          <p className="mt-2 text-[#7b8782]">Psicólogo Clínico</p>
          <p className="mx-auto mt-4 max-w-xs text-base leading-relaxed">
            Terapia psicológica para ansiedad, estrés y relaciones. Un espacio
            seguro para empezar a sentirte mejor.
          </p>
        </div>
 
        <div className="flex w-full max-w-xs flex-col gap-3">
          <CitaButton className="rounded-full bg-[#4f7a68] py-3 text-center font-medium text-white shadow-sm transition-colors active:bg-[#3f6454]">
            Agenda tu cita
          </CitaButton>
          <div className="grid grid-cols-2 gap-3">
            {SECONDARY.map((btn) => (
              <Link
                key={btn.href}
                href={btn.href}
                className="rounded-full border border-[#dfe9e4] bg-white py-3 text-center text-sm transition-colors active:bg-[#f1f5f3]"
              >
                {btn.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contacto"
            className="text-center text-sm text-[#7b8782] underline underline-offset-4"
          >
            Prefiero que me contactes tú
          </Link>
        </div>
 
        <span aria-hidden className="animate-bounce text-[#7b8782]">
          ↓
        </span>
      </section>
 
      {/* CARRUSEL DE SERVICIOS */}
      <section className="py-12">
        <Reveal className="px-6">
          <h2 className="text-2xl font-light">¿En qué te puedo ayudar?</h2>
          <p className="mt-1 text-sm text-[#7b8782]">Desliza para ver más →</p>
        </Reveal>
 
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="w-64 shrink-0 snap-center rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-sm"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe9e4] text-[#4f7a68]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" />
                  <path d="M4 20c3-5 6-8 11-11" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7b8782]">
                {s.text}
              </p>
            </article>
          ))}
        </div>
      </section>
 
      {/* ¿TE SUENA FAMILIAR? */}
      <section className="bg-[#f1f5f3] px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-light">¿Te suena familiar?</h2>
          <p className="mt-1 text-sm text-[#7b8782]">
            Si te identificas con alguna, esta página es para ti.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-6 flex flex-wrap gap-2">
          {SYMPTOMS.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#dfe9e4] bg-white px-4 py-2 text-sm"
            >
              {t}
            </span>
          ))}
        </Reveal>
      </section>
 
      {/* CÓMO FUNCIONA */}
      <section className="px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-light">Cómo funciona</h2>
        </Reveal>
        <ol className="mt-6 flex flex-col gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4f7a68] text-sm font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#7b8782]">
                    {s.text}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
 
      {/* FAQ */}
      <section className="bg-[#f1f5f3] px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-light">Preguntas frecuentes</h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[#dfe9e4] bg-white px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="text-[#4f7a68] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#7b8782]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
 
      {/* CIERRE */}
      <section className="px-6 py-14 text-center">
        <Reveal>
          <h2 className="text-2xl font-light">Dar el primer paso es lo más difícil</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-[#7b8782]">
            Escríbeme y vemos juntos cómo acompañarte.
          </p>
          <CitaButton className="mt-6 inline-block rounded-full bg-[#4f7a68] px-8 py-3 font-medium text-white transition-colors active:bg-[#3f6454]">
            Escríbeme por WhatsApp
          </CitaButton>
        </Reveal>
      </section>
 
      {/* BARRA FIJA (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#dfe9e4] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <CitaButton className="block w-full rounded-full bg-[#4f7a68] py-3 text-center font-medium text-white active:bg-[#3f6454]">
          Agendar por WhatsApp
        </CitaButton>
      </div>
    </div>
    </CitaProvider>
  );
}
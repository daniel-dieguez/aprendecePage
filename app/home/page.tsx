import Link from "next/link";

const BUTTONS = [
  { label: "Contactarme", href: "/contacto" },
  { label: "Ubicación", href: "/contacto#ubicacion" },
  { label: "Saber más de mí", href: "/sobremi" },
];

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-10 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-light text-gray-900">
          Hola, soy Luis Dieguez
        </h1>
        <p className="mt-2 text-gray-500">Psicólogo Clínico</p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-4">
        {BUTTONS.map((btn) => (
          <Link
            key={btn.href}
            href={btn.href}
            className="rounded-full border border-gray-300 py-3 text-center text-gray-800 transition-colors active:bg-gray-100"
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
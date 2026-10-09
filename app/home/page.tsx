import Link from "next/link";
import Image from "next/image";
import perfil from "../Components/images/licenciado3.png"

const BUTTONS = [
  { label: "Contactarme", href: "/contacto" },
  { label: "Ubicación", href: "/ubicacion" },
  { label: "Saber más de mí", href: "/sobremi" },
];

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-10 px-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src={perfil}
          alt="Luis Diéguez, psicólogo clínico"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full object-cover"
          priority
        />
       
      </div>
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
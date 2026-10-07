import Link from "next/link";
import Image from "next/image";
import ContadorAnimado from "../Components/contadorAnimado";
import TextoDesplegable from "../Components/textoDesplegable";
import { ESTADISTICAS, LOGROS } from "../utils/logros";

// import {} from '@gravity-ui/icons';
// import {} from '@gravity-ui/icons';

const PARRAFOS = [
  "Luis Diéguez es un profesional con más de 30 años de experiencia en el campo de la psicología, habiendo ayudado a más de 1,000 pacientes a lo largo de su carrera. Graduado de la prestigiosa Universidad Rafael Landívar de Guatemala ha construido una sólida trayectoria en la atención emocional y el desarrollo personal.",
  "A lo largo de su carrera ha ampliado su experiencia no solo en el ámbito clínico, sino también en el coaching empresarial brindando apoyo a compañías en la mejora del bienestar laboral y emocional de sus empleados. Su enfoque integral le permite acompañar tanto en lo individual como a grupos en la búsqueda de un equilibrio emocional y mental.",
  "Su propósito central es proporcionar un acompañamiento personalizado a todas aquellas personas que necesiten apoyo en su salud emocional, con el firme compromiso de guiarlas hacia una vida más equilibrada y plena.",
];

export default function InformacionPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-10">
      {/* Encabezado */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/luis-dieguez.jpg"
          alt="Luis Diéguez, psicólogo clínico"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full object-cover"
          priority
        />
        <h1 className="mt-6 text-2xl font-light text-gray-900">
          Luis Diéguez
        </h1>
        <p className="mt-1 text-gray-500">
          Psicólogo con más de 30 años de experiencia
        </p>
      </div>

      {/* Estadísticas */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        {ESTADISTICAS.map((e) => (
          <div
            key={e.etiqueta}
            className="rounded-2xl border border-gray-200 py-6 text-center"
          >
            <p className="text-3xl font-light text-gray-900">
              <ContadorAnimado valor={e.valor} sufijo={e.sufijo} />
            </p>
            <p className="mt-1 text-xs text-gray-500">{e.etiqueta}</p>
          </div>
        ))}
      </div>

      {/* Biografía */}
      <div className="mt-10">
        <TextoDesplegable parrafos={PARRAFOS} />
      </div>

      {/* Logros */}
      {/* Logros */}
<div className="mt-10 space-y-3">
  {LOGROS.map((logro) => {
    const Icono = logro.icono; // debe empezar con mayúscula para usarlo como componente

    return (
      <div
        key={logro.titulo}
        className="flex items-start gap-4 rounded-2xl border border-gray-200 p-4"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
          <Icono width={20} height={20} className="text-gray-800" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{logro.titulo}</h3>
          <p className="mt-1 text-sm text-gray-500">{logro.descripcion}</p>
        </div>
      </div>
    );
  })}
</div>

      {/* Llamado a la acción */}
      <Link
        href="/contacto"
        className="mt-10 block rounded-full border border-gray-300 py-3 text-center text-gray-800 transition-colors active:bg-gray-100"
      >
        Contactarme
      </Link>
    </section>
  );
}
import type { ComponentType, SVGProps } from "react";
import { Briefcase, GraduationCap, Heart, Persons } from "@gravity-ui/icons";

export interface Estadistica {
  valor: number;
  sufijo: string;
  etiqueta: string;
}

export interface Logro {
  icono: ComponentType<SVGProps<SVGSVGElement>>;
  titulo: string;
  descripcion: string;
}

export const ESTADISTICAS: Estadistica[] = [
  { valor: 30, sufijo: "+", etiqueta: "Años de experiencia" },
  { valor: 1000, sufijo: "+", etiqueta: "Pacientes atendidos" },
];

export const LOGROS: Logro[] = [
  {
    icono: GraduationCap,
    titulo: "Formación académica",
    descripcion: "Graduado de la Universidad Rafael Landívar de Guatemala.",
  },
  {
    icono: Heart,
    titulo: "Experiencia clínica",
    descripcion:
      "Más de tres décadas de atención emocional y desarrollo personal.",
  },
  {
    icono: Briefcase,
    titulo: "Coaching empresarial",
    descripcion:
      "Apoyo a compañías en el bienestar laboral y emocional de sus equipos.",
  },
  {
    icono: Persons,
    titulo: "Enfoque integral",
    descripcion: "Acompañamiento individual y grupal, siempre personalizado.",
  },
];
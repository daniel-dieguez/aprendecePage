export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/home" },
  { label: "Sobre mí", href: "/informacion" },
  { label: "Contacto", href: "/contacto" },
];
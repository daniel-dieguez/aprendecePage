# Landing Page - Psicólogo Clínico

Landing page *mobile-first* para **Luis Diéguez**, psicólogo clínico con más de 30 años de experiencia. El objetivo es que los pacientes puedan conocerlo, ubicarlo y contactarlo rápidamente desde el teléfono.

## Características

- Diseño minimalista, fondo blanco y botones simples, pensado para móvil.
- Navbar fijo con menú hamburguesa y panel lateral (sidebar/drawer).
- Página de inicio con accesos directos: contacto, ubicación y "Sobre mí".
- Página "Sobre mí" con:
  - Estadísticas animadas (contadores que se activan al entrar en pantalla).
  - Biografía con texto desplegable ("Leer más / Leer menos").
  - Tarjetas de logros con íconos.
- Enlaces centralizados en un solo archivo para evitar inconsistencias.

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js](https://nextjs.org/) (App Router) | Framework y enrutamiento |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos |
| [@gravity-ui/icons](https://gravity-ui.com/icons) | Íconos SVG |

## Estructura del proyecto

```
.
├── app/
│   ├── layout.tsx          # Layout raíz (incluye Navbar)
│   ├── page.tsx            # Redirige a /home
│   ├── home/
│   │   └── page.tsx        # Página de bienvenida
│   ├── sobremi/
│   │   └── page.tsx        # Información del psicólogo
│   └── contacto/
│       └── page.tsx        # Contacto y ubicación (en desarrollo)
├── components/
│   ├── Navbar.tsx          # Barra superior con botón de menú
│   ├── Sidebar.tsx         # Panel lateral de navegación
│   ├── ContadorAnimado.tsx # Contador que anima al entrar en viewport
│   └── TextoDesplegable.tsx# Texto con "Leer más"
├── utils/
│   ├── links.ts            # Enlaces de navegación
│   └── logros.ts           # Estadísticas y logros
└── public/
    └── luis-dieguez.jpg    # Foto de perfil
```

## Rutas

| Ruta | Descripción | Estado |
|---|---|---|
| `/` | Redirige a `/home` | Listo |
| `/home` | Bienvenida con 3 botones principales | Listo |
| `/sobremi` | Biografía, estadísticas y logros | Listo |
| `/contacto` | Contacto, WhatsApp, ubicación y mapa | En desarrollo |

> **Importante:** en Next.js la URL se define por el nombre de la carpeta dentro de `app/`. Los `href` en `utils/links.ts` y en `app/home/page.tsx` deben coincidir exactamente con esos nombres (por ejemplo `/sobremi`).

## Requisitos previos

- Node.js 18.18 o superior
- npm, yarn o pnpm

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd <nombre-del-proyecto>

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Ejecuta el linter |

## Personalización

### Cambiar los enlaces de navegación

Edita `utils/links.ts`:

```ts
export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/home" },
  { label: "Sobre mí", href: "/sobremi" },
  { label: "Contacto", href: "/contacto" },
];
```

### Cambiar estadísticas y logros

Edita `utils/logros.ts`. Cada logro recibe un ícono como **componente de React**, no como texto:

```ts
import { GraduationCap } from "@gravity-ui/icons";

{
  icono: GraduationCap,
  titulo: "Formación académica",
  descripcion: "Graduado de la Universidad Rafael Landívar de Guatemala.",
}
```

Los íconos disponibles están en el [catálogo de Gravity UI](https://gravity-ui.com/icons). Si TypeScript marca error en un nombre, verifica que exista en la versión instalada.

### Cambiar la foto

Reemplaza `public/luis-dieguez.jpg` por la imagen definitiva (recomendado: cuadrada, mínimo 256×256 px) o actualiza el `src` en `app/sobremi/page.tsx`.

## Decisiones de diseño

- **Mobile-first:** la mayoría de los visitantes llegará desde el teléfono, por eso se usa un menú hamburguesa en lugar de un sidebar fijo.
- **Sin librerías de animación:** el contador usa `IntersectionObserver` y `requestAnimationFrame`, lo que mantiene el bundle liviano.
- **Datos separados de la UI:** textos, estadísticas y enlaces viven en `utils/`, de modo que se pueden editar sin tocar los componentes.
- **Componentes de servidor por defecto:** solo se usa `"use client"` donde hay estado o efectos (Navbar, Sidebar, ContadorAnimado, TextoDesplegable).

## Roadmap

- [ ] Página de contacto (WhatsApp, teléfono, correo)
- [ ] Sección de ubicación con mapa
- [ ] Botón de WhatsApp con mensaje predefinido
- [ ] Metadatos SEO y Open Graph por página
- [ ] Sección de servicios y áreas de especialidad
- [ ] Preguntas frecuentes
- [ ] Testimonios (con consentimiento y de forma anónima)
- [ ] Despliegue en Vercel

## Despliegue

La forma más sencilla es [Vercel](https://vercel.com/):

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Vercel detecta Next.js automáticamente; no requiere configuración adicional.

## Solución de problemas

**`The default export is not a React Component in "/contacto/page"`**
El archivo `page.tsx` está vacío o no tiene `export default` con un componente. Todo `page.tsx` debe exportar por defecto una función que devuelva JSX.

**404 al abrir "Sobre mí"**
El nombre de la carpeta en `app/` no coincide con el `href`. Verifica que ambos usen `sobremi`.

**Rutas o cambios que no se reflejan**
Borra la carpeta `.next` y reinicia el servidor con `npm run dev`.

## Autor

Proyecto desarrollado para **Luis Diéguez**, psicólogo clínico.
// Utilidades compartidas para armar y abrir el mensaje de WhatsApp.

export const TELEFONO = "50255162181";

export type Datos = {
  nombre: string;
  pais: string;
  edad: string;
  profesion: string;
  motivo: string;
};

export const VACIO: Datos = {
  nombre: "",
  pais: "",
  edad: "",
  profesion: "",
  motivo: "",
};

export function armarMensaje(d: Datos) {
  let mensaje =
    `¡Hola Lic! Vi su perfil en redes sociales y me gustaría agendar una cita con usted.\n\n` +
    `El motivo de mi consulta es: ${d.motivo.trim()}\n\n` +
    `Mi nombre es ${d.nombre.trim()},\n\n` +
    `Soy de ${d.pais.trim()}\n\n` +
    `Tengo ${d.edad.trim()} años.`;

  if (d.profesion.trim()) {
    mensaje += `\n\nActualmente, tengo estudios en ${d.profesion.trim()}.`;
  }

  return mensaje;
}

// Enlaces según cómo se quiera abrir WhatsApp
export function armarEnlaces(mensaje: string) {
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

export type Entorno = {
  enApp: boolean; // TikTok, Instagram, Facebook... (navegador interno)
  android: boolean;
  ios: boolean;
  nombreApp: string;
};

export function detectarEntorno(): Entorno {
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
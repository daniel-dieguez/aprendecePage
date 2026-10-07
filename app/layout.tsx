import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/navbar";

export const metadata: Metadata = {
  title: "Psicólogo Clínico",
  description: "Atención psicológica profesional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        {/* <Navbar /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
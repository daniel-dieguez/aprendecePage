"use client";

import Link from "next/link";
import { useEffect } from "react";
import { NAV_LINKS } from "../utils/links";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel lateral */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 text-2xl text-gray-700"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-gray-100 py-4 text-lg text-white-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./siderbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
        <Link href="/home" className="text-lg font-medium text-gray-900">
          Psic. Luis Dieguez
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú"
          className="flex flex-col gap-1.5 p-2"
        >
          <span className="h-0.5 w-6 bg-gray-800" />
          <span className="h-0.5 w-6 bg-gray-800" />
          <span className="h-0.5 w-6 bg-gray-800" />
        </button>
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
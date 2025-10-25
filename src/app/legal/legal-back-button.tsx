"use client";

import { ChevronLeft } from "lucide-react";

export default function LegalBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mb-4 flex items-center text-sm text-gray-500 group hover:text-brand-primary"
    >
      <ChevronLeft
        className="h-4 w-4 mr-1 transition-transform transform group-hover:-translate-x-1"
        size={16}
      />
      Volver
    </button>
  );
}

"use client";
import { InnerWrap } from "@/lib/atoms";
import React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-200">
      <div className="text-slate-500">Cargando video...</div>
    </div>
  ),
});

export default function AttentionCoursePreview() {
  return (
    <InnerWrap className="pb-12 mt-12 max-w-5xl">
      <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-7xl rounded-2xl shadow-lg">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=UzoSfWMylxQ"
          width="100%"
          height="100%"
          pip
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-12 max-w-3xl text-center">
        <h3 className="text-4xl font-semibold text-white shadow-md">
          Aprende de un experto: Cómo empezar en la inversión inmobiliaria con
          un mentor, de la mano.
        </h3>
        <p className="text-lg text-slate-500 opacity-80 mt-4 max-w-prose">
          Únete a nuestro curso para aprender estrategias de inversión
          inmobiliaria y construir un portafolio exitoso.
        </p>
      </div>
    </InnerWrap>
  );
}

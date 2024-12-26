"use client";
import { InnerWrap } from "@/lib/atoms";
import React from "react";
import ReactPlayer from "react-player";

export default function AttentionCoursePreview() {
  return (
    <InnerWrap className="py-0 mt-12">
      <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl border-4 border-black">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=UzoSfWMylxQ"
          width="100%"
          height="100%"
          pip
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-12 max-w-3xl">
        <h3 className="text-4xl font-semibold">
          Aprende de un experto: Cómo empezar en la inversión inmobiliaria con
          un mentor, de la mano.
        </h3>
        <p className="text-lg text-white opacity-80 mt-4 max-w-prose">
          Únete a nuestro curso para aprender estrategias de inversión
          inmobiliaria y construir un portafolio exitoso.
        </p>
      </div>
    </InnerWrap>
  );
}

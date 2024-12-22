"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import React from "react";
import ReactPlayer from "react-player";

export default function InterestPersonalStory() {
  return (
    <Wrapper>
      <InnerWrap className="py-0 mt-12">
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl border-4 border-black">
          <ReactPlayer
            url="https://youtu.be/XCgMXnJc598"
            width="100%"
            height="100%"
            pip
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-12 max-w-3xl">
          <h3 className="text-4xl font-semibold">
            Conoce a tu instructor: La historia personal detrás del éxito en la
            inversión inmobiliaria.
          </h3>
          <p className="text-lg text-white opacity-80 mt-4 max-w-prose">
            Descubre la trayectoria y las experiencias que han llevado a tu
            instructor a convertirse en un experto en inversión inmobiliaria.
            Aprende de sus desafíos y logros para inspirarte en tu propio
            camino.
          </p>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

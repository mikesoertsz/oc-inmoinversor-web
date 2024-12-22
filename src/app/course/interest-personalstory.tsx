"use client";
import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import React from "react";
import ReactPlayer from "react-player";

export default function InterestPersonalStory() {
  return (
    <Wrapper className="bg-gradient-to-t from-black to-brand-bg1 py-[10dvh]">
      <InnerWrap className="py-0 mt-12">
        <TitleBlock
          heading="Hola, soy Guillermo, y el sector inmobiliario cambió mi vida."
          theme="dark"
          orientation="center"
        />
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl mt-8">
          <ReactPlayer
            url="https://youtu.be/XCgMXnJc598"
            width="100%"
            height="100%"
            pip
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-5 max-w-4xl text-center">
          <h4 className="text-lg font-light text-gray-200">
            Conoce a tu instructor: La historia personal detrás del éxito en la
            inversión inmobiliaria.
          </h4>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

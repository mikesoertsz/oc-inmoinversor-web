"use client";

import { InnerWrap, Wrapper } from "@/lib/atoms";
import ReactPlayer from "react-player";

export default function LastVideo() {
  return (
    <Wrapper className="bg-gradient-to-t from-brand-bg1 to-brand-bg py-[5dvh]">
      <InnerWrap className="items-start justify-center max-w-4xl">
        <h2 className="tracking-tight font-title text-center mb-4 text-2xl text-white">
          Ver el episodio más reciente:
        </h2>
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=h34shkm9xJ8"
            width="100%"
            height="100%"
            pip
          />
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

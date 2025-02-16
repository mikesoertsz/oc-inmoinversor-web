"use client";

import { InnerWrap, Wrapper } from "@/lib/atoms";
import ReactPlayer from "react-player";

export default function LastVideo() {
  return (
    <Wrapper className="bg-gradient-to-t from-brand-bg1 to-black py-[5dvh] md:px-3">
      <InnerWrap className="items-center justify-center max-w-4xl text-center py-[5dvh] md:py-[10dvh]">
        <h2 className="tracking-tight font-title text-center mb-8 text-2xl text-white">
          Ver el episodio más reciente
        </h2>
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=726d1cPlISE"
            width="100%"
            height="100%"
            pip
          />
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

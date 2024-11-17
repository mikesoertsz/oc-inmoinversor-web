"use client";
import { InnerWrap } from "@/lib/atoms";
import React from "react";
import ReactPlayer from "react-player";

export default function AttentionCoursePreview() {
  return (
    <InnerWrap className="">
      <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=h34shkm9xJ8"
          width="100%"
          height="100%"
          pip
        />
      </div>
    </InnerWrap>
  );
}

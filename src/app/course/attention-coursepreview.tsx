"use client";
import { InnerWrap } from "@/lib/atoms";
import React from "react";
import ReactPlayer from "react-player";

export default function AttentionCoursePreview() {
  return (
    <InnerWrap className="aspect-video rounded-2xl overflow-hidden flex w-full border border-black shadow-lg mt-24 wrapper">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=h34shkm9xJ8"
        width="100%"
        height="500px"
        controls
        pip
      />
    </InnerWrap>
  );
}

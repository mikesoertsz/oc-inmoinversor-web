"use client";
import { InnerWrap } from "@/lib/atoms";
import React from "react";
import ReactPlayer from "react-player";

export default function AttentionCoursePreview() {
  return (
    <InnerWrap className="relative aspect-video rounded-2xl overflow-hidden flex w-full border border-black shadow-lg mt-24">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=h34shkm9xJ8"
        width="100%"
        height="100%"
        controls
        className="rounded-2xl z-30 relative"
      />
    </InnerWrap>
  );
}

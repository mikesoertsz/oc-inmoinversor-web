"use client";
import React from "react";
import ReactPlayer from "react-player";

export default function PersonalStory() {
  return (
    <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl mt-8">
      <ReactPlayer
        url="https://youtu.be/XCgMXnJc598"
        width="100%"
        height="100%"
        pip
      />
    </div>
  );
}

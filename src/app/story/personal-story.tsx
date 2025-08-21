"use client";
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

export default function PersonalStory() {
  return (
    <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-2xl shadow-xl">
      <ReactPlayer
        url="https://youtu.be/XCgMXnJc598"
        width="100%"
        height="100%"
        pip
      />
    </div>
  );
}

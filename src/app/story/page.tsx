import { Button } from "@/components/ui/button";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Story",
  };
}

export default async function Story() {
  return (
    <main className="flex flex-col h-full w-full bg-slate-900">
      <Wrapper className="py-[5dvh]">
        <InnerWrap className="flex flex-col max-w-3xl text-left text-gray-30">
          <h1 className="text-6xl font-semibold text-white w-full mb-3">
            Story of Guillermo Ortiz
          </h1>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
            <div className="flex flex-col w-full aspect-video overflow-hidden relative rounded-xl">
              <Image
                src="/img/guillermo-ortiz.png"
                alt="Guillermo Ortiz"
                fill
                className="absolute inset-0"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p></p>
          </div>
          <div className="flex justify-between items-center bg-slate-800 text-white p-8 gap-12 rounded-xl my-4">
            <p className="text-sm">
              If you want to learn real estate investment from a professional,
              feel free to check out my course. I&apos;ve listed everything that
              I know so you can replicate the strategies with your own
              investments.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/course">View Course</Link>
            </Button>
          </div>
        </InnerWrap>
      </Wrapper>
    </main>
  );
}

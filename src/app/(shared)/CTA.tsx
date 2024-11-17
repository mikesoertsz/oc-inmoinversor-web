import React from "react";
import tw from "tailwind-styled-components";
import { Body, Heading, InnerWrap, Preheading, Wrapper } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { BiLogoZoom } from "react-icons/bi";
import Link from "next/link";
import { Titles } from "./Titles";

type Props = {};

export default function CTA({}: Props) {
  const ctaContent = {
    preheading: "Ready to get started?",
    heading: "Let's talk about your project.",
    body: "Get in touch today. Let's build something great together.",
  };
  return (
    <Wrapper className="text-gray-200 bg-brand-base-f">
      <InnerWrap>
        <div className="flex flex-col items-center justify-center py-[10vh] text-center">
          <Titles content={ctaContent} theme="dark" />
          <div className="flex gap-4 mt-4">
            <Link
              className="flex items-center justify-center gap-2 px-12 py-4 mt-8 font-medium text-black transition duration-200 ease-in-out bg-yellow-300 rounded-lg shadow-none text-md hover:bg-white hover:text-black font-body"
              href="https://cal.com/startupmike/discovery-call"
            >
              <BiLogoZoom size={25} />
              Book a consultation
            </Link>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

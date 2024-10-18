import React from "react";
import Image from "next/image";
import { InnerWrap, Wrapper } from "@/lib/atoms";

const heroContent = {
  title: "Real Estate Investment Insights",
  description:
    "Discover the latest strategies in real estate investment through our blog and YouTube channel.",
  buttons: [
    { text: "Learn More", url: "/learn-more" },
    { text: "Subscribe", url: "/subscribe" },
  ],
  imageUrl: "", // Replace with your image path
  imageAlt: "Real Estate Insights",
};

export default function Hero() {
  return (
    <Wrapper className="">
      <InnerWrap className="items-start justify-center max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">{heroContent.title}</h1>
        <p className="mb-8">{heroContent.description}</p>
        <div className="flex justify-center space-x-4 mb-8">
          {heroContent.buttons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              {button.text}
            </a>
          ))}
        </div>
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl">
          <Image
            src={heroContent.imageUrl}
            alt={heroContent.imageAlt}
            fill
            className="aspect-video absolute inset-0"
            style={{ objectFit: "cover" }}
          />
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

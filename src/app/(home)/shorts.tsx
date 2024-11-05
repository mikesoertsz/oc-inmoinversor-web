"use client";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";
import Image from "next/image";
import React from "react";

const shortsData = {
  title: "Recent YouTube Shorts",
  description: "Check out our latest YouTube shorts on real estate investment.",
  shorts: [
    {
      category: "Invest",
      title: "Top Tips for First-Time Investors",
      thumbnailUrl: "",
      videoUrl: "https://youtube.com/watch?v=example1",
    },
    {
      category: "Market",
      title: "Understanding Property Valuation in Spain",
      thumbnailUrl: "",
      videoUrl: "https://youtube.com/watch?v=example2",
    },
    {
      category: "Finance",
      title: "Navigating Mortgages for Investment Properties",
      thumbnailUrl: "",
      videoUrl: "https://youtube.com/watch?v=example3",
    },
    {
      category: "Tips",
      title: "How to Find the Best Investment Properties",
      thumbnailUrl: "",
      videoUrl: "https://youtube.com/watch?v=example4",
    },
    {
      category: "Guide",
      title: "Step-by-Step Guide to Real Estate Investment",
      thumbnailUrl: "",
      videoUrl: "https://youtube.com/watch?v=example5",
    },
  ],
};

interface DummyContentProps {
  short: Article;
}

const DummyContent: React.FC<DummyContentProps> = ({ short }) => {
  return (
    <a href={short.video_url} target="_blank" rel="noopener noreferrer">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-500">
            {short.categories[0] ?? ""}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{short.title}</h3>
        <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
          <Image
            src={short.image}
            alt={short.title}
            fill
            className="aspect-video absolute inset-0"
          />
        </div>
      </div>
    </a>
  );
};

interface ShortsCarouselProps {
  shorts: Article[];
}

export default function ShortsCarousel({ shorts }: ShortsCarouselProps) {
  const cards = shorts.map((short, index) => (
    <Card
      key={short.canonical_url}
      card={{
        src: short.image,
        content: <DummyContent short={short} />,
        title: short.title,
        category: short.categories[0] ?? "",
      }}
      index={index}
    />
  ));

  return (
    <Wrapper>
      <div className="w-full h-full py-20 fillscreen">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          {shortsData.title}
        </h2>
        <p className="max-w-7xl pl-4 mx-auto text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 font-sans mb-8">
          {shortsData.description}
        </p>
        <Carousel items={cards} />
      </div>
    </Wrapper>
  );
}

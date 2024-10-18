import React from "react";
import Image from "next/image";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { MdPerson } from "react-icons/md";
import BlogActionsBar from "./blog-actions-bar";

const blogHeroContent = {
  category: "Investment",
  title: "Top Strategies for Real Estate Success in Spain",
  author: "John Doe",
  date: "11 Jan 2022",
  readTime: "5 min read",
  imageUrl: "/images/placeholder.jpg",
  imageAlt: "Real estate success strategies in Spain",
};

export default function BlogHero() {
  return (
    <Wrapper className="py-[5dvh]">
      <InnerWrap className="items-start justify-center max-w-6xl">
        <div className="text-sm text-gray-500 mb-2">
          Blog &gt; {blogHeroContent.category}
        </div>
        <h1 className="text-4xl font-bold mb-4">{blogHeroContent.title}</h1>
        <div className="flex items-center justify-between w-full h-12">
          <div className="flex items-center text-sm text-gray-500">
            <MdPerson className="mr-2" />
            <span>{blogHeroContent.author}</span>
            <span className="mx-2">•</span>
            <span>{blogHeroContent.date}</span>
            <span className="mx-2">•</span>
            <span>{blogHeroContent.readTime}</span>
          </div>
          <BlogActionsBar />
        </div>
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-xl">
          <Image
            src={blogHeroContent.imageUrl}
            alt={blogHeroContent.imageAlt}
            fill
            className="aspect-video absolute inset-0"
            style={{ objectFit: "cover" }}
          />
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

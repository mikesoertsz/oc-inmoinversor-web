import React from "react";
import Image from "next/image";
import { Wrapper, InnerWrap } from "@/lib/atoms";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const blogContent = {
  title: "Introduction",
  introText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  imageUrl: "/images/placeholder.jpg",
  imageAlt: "Placeholder image",
  sections: [
    {
      heading: "Section 1",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      heading: "Section 2",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ],
  conclusion: "Conclusion",
  conclusionText:
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  socialMedia: [
    { icon: FaFacebook, url: "https://facebook.com" },
    { icon: FaTwitter, url: "https://twitter.com" },
    { icon: FaLinkedin, url: "https://linkedin.com" },
  ],
};

export default function BlogContent() {
  return (
    <Wrapper className="py-8">
      <InnerWrap className="max-w-3xl text-left mx-auto flex flex-col items-start justify-start">
        <h1 className="text-3xl font-bold mb-4">{blogContent.title}</h1>
        <p className="text-gray-700 mb-6">{blogContent.introText}</p>
        <div className="flex justify-center mb-6">
          <Image
            src={blogContent.imageUrl}
            alt={blogContent.imageAlt}
            width={600}
            height={300}
            className="rounded"
          />
        </div>
        {blogContent.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
            <p className="text-gray-700">{section.text}</p>
          </div>
        ))}
        <h2 className="text-2xl font-semibold mb-2">
          {blogContent.conclusion}
        </h2>
        <p className="text-gray-700 mb-6">{blogContent.conclusionText}</p>
        <div className="flex gap-4">
          {blogContent.socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

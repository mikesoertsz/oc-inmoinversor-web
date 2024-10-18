import React from "react";
import BlogHero from "./blog-hero";
import BlogContent from "./blog-content";
import BlogRelatedPosts from "./blog-related-posts";

export default function page() {
  return (
    <main className="flex flex-col h-full w-full scroll-smooth">
      <BlogHero />
      <BlogContent />
      <BlogRelatedPosts />
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ArticleCard } from "./ArticleCard"; // Import the ArticleCard component

interface Article {
  title: string;
  slug: string;
  description: string;
  image: string;
  alt_text: string;
  featured?: boolean;
  readingTime: string; // Ensure readingTime is included
}

interface ArticleSliderProps {
  title: string;
  articles: Article[];
}

export function ArticleSlider({ title, articles }: ArticleSliderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 3;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentArticles = articles.slice(
    currentPage * articlesPerPage,
    (currentPage + 1) * articlesPerPage
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentArticles.map((article) => {
          if (!article.slug || !article.title || !article.description) {
            return null;
          }
          return <ArticleCard key={article.slug} article={article} />;
        })}
      </div>
    </div>
  );
}

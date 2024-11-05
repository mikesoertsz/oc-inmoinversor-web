import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import BlogActionsBar from "./blog-actions-bar";

interface BlogHeroProps {
  article: Article;
}

export function BlogHero({ article }: BlogHeroProps) {
  return (
    <Wrapper className="py-[5dvh]">
      <InnerWrap className="items-start justify-center max-w-6xl">
        <div className="text-sm text-gray-500 mb-2">
          Blog &gt; {article.categories[0]}
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-between w-full h-12">
          <div className="flex items-center text-sm text-gray-500">
            <MdPerson className="mr-2" />
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>{article.reading_time}</span>
          </div>
          <BlogActionsBar />
        </div>
        <div className="flex justify-center w-full aspect-video overflow-hidden bg-slate-100 relative max-w-6xl rounded-xl">
          <Image
            src={article.image}
            alt={article.slug}
            fill
            className="aspect-video absolute inset-0"
            style={{ objectFit: "cover" }}
          />
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

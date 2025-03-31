import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";
import Image from "next/image";
import { MdPerson } from "react-icons/md";

interface BlogHeroProps {
  article: Article;
}

export function BlogHero({ article }: BlogHeroProps) {
  return (
    <Wrapper className="pt-8">
      <InnerWrap className="items-start justify-center max-w-4xl py-8">
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <span className="hover:text-gray-700">Blog</span>
          <span className="mx-2">/</span>
          <span className="hover:text-gray-700">{article.categories[0]}</span>
        </div>
        <h1 className="text-3xl tracking-tight font-medium mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center justify-between w-full mb-8">
          <div className="flex items-center text-xs text-gray-600">
            <MdPerson className="mr-2 text-gray-500" />
            <span className="font-medium">Guillermo Ortiz</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>{article.reading_time}</span>
          </div>
          {/* <BlogActionsBar /> */}
        </div>
        <div className="w-full aspect-[2/1] overflow-hidden bg-gray-100 relative rounded-xl mb-4">
          <Image
            src={article.image}
            alt={article.alt_text || article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

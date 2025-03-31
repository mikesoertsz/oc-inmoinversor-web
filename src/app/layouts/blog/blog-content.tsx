import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";

interface BlogContentProps {
  article: Article;
}

export function BlogContent({ article }: BlogContentProps) {
  return (
    <Wrapper className="py-4">
      <InnerWrap className="prose prose-lg max-w-3xl mx-auto py-24">
        <div className="prose-headings:font-medium prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal gap-4">
          {article.content}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

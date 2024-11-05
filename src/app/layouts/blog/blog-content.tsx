import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Article } from "@/lib/types";

interface BlogContentProps {
  article: Article;
}

export function BlogContent({ article }: BlogContentProps) {
  return (
    <Wrapper className="py-8">
      <InnerWrap className="prose max-w-3xl text-left mx-auto flex flex-col items-start justify-start">
        {article.content}
      </InnerWrap>
    </Wrapper>
  );
}

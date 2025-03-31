import { InnerWrap, Wrapper } from "@/lib/atoms";
import { ArticleCard } from "@/app/blog/components/ArticleCard";
import { Article } from "@/lib/types";

interface BlogRelatedPostsProps {
  relatedPosts?: Article[];
}

export function BlogRelatedPosts({ relatedPosts }: BlogRelatedPostsProps) {
  if (!relatedPosts?.length) return null;

  return (
    <Wrapper className="py-8 bg-gray-50">
      <InnerWrap className="max-w-4xl py-12">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium mb-2">
              Artículos Relacionados
            </h2>
            <p className="text-gray-600">
              Otros artículos que te pueden interesar
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <ArticleCard key={post.slug} article={post} />
            ))}
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

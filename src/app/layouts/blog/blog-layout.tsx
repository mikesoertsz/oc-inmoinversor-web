import { Article } from "@/lib/types";
import { getRelatedArticlesAction } from "@/server/actions/articles";
import { BlogContent } from "./blog-content";
import { BlogHero } from "./blog-hero";
import { BlogRelatedPosts } from "./blog-related-posts";

interface BlogLayoutProps {
  article: Article;
  children?: React.ReactNode;
}

export async function BlogLayout({ article }: BlogLayoutProps) {
  const relatedPosts = await getRelatedArticlesAction(article.related_posts);

  return (
    <>
      <BlogHero article={article} />
      <BlogContent article={article} />
      <BlogRelatedPosts relatedPosts={relatedPosts} />
    </>
  );
}

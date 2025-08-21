import { Article } from "@/lib/types";
import { getAllArticlesAction } from "@/server/actions/articles";
import { BlogContent } from "./blog-content";
import { BlogHero } from "./blog-hero";
import { BlogRelatedPosts } from "./blog-related-posts";

interface BlogLayoutProps {
  article: Article;
  children?: React.ReactNode;
}

export async function BlogLayout({ article }: BlogLayoutProps) {
  // Get all articles and filter out the current one
  const allArticles = await getAllArticlesAction();
  const otherArticles = allArticles.filter((a) => a.slug !== article.slug);

  // Select 3 articles based on date (most recent first) instead of random
  const relatedPosts = otherArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <article className="flex-grow">
        <BlogHero article={article} />
        <BlogContent article={article} />
      </article>
      <BlogRelatedPosts relatedPosts={relatedPosts} />
    </div>
  );
}

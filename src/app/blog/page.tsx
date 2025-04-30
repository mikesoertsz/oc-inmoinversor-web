import { InnerWrap, Wrapper } from "@/lib/atoms";
import { getAllArticlesAction } from "@/server/actions/articles";
import { Metadata } from "next";
import { ArticleCard } from "./components/ArticleCard";
import { ArticleSearch } from "./components/ArticleSearch";
import { ArticleSlider } from "./components/ArticleSlider";

// Define a simpler article type for the UI components
interface UIArticle {
  title: string;
  slug: string;
  description: string;
  image: string;
  alt_text: string;
  featured?: boolean;
  readingTime: string; // Added reading time property
  categories: string[]; // Added categories property
}

export const metadata: Metadata = {
  title: "Blog | InmoInversor",
  description:
    "Artículos sobre inversión inmobiliaria y bienes raíces en España",
};

export default async function BlogPage() {
  const articles = await getAllArticlesAction();

  // Convert full articles to UI articles with image fallback
  const articlesWithImages: UIArticle[] = articles.map((article) => ({
    title: article.title,
    slug: article.slug,
    description: article.description,
    image: article.image || "/article-img/article-img-1.jpg",
    alt_text: article.alt_text,
    featured: article.featured,
    readingTime: article.reading_time, // Ensure readingTime is included
    categories: article.categories, // Ensure categories are included
  }));

  // Get the 6 most recent articles
  const recentArticles = articlesWithImages.slice(0, 6);

  // Get 6 featured articles
  const featuredArticles = articlesWithImages
    .filter((article) => article.featured)
    .slice(0, 6);

  return (
    <main className="flex flex-col h-full w-full scroll-smooth bg-slate-100">
      <Wrapper className="bg-gray-50">
        <InnerWrap className="py-16">
          <ArticleSearch articles={articlesWithImages} />
        </InnerWrap>
      </Wrapper>

      <Wrapper>
        <InnerWrap className="py-12 gap-16">
          <ArticleSlider
            title="Artículos destacados"
            articles={
              featuredArticles.length ? featuredArticles : recentArticles
            }
          />

          <div className="space-y-8">
            <h2 className="text-2xl font-medium">Todos los artículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articlesWithImages.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </InnerWrap>
      </Wrapper>
    </main>
  );
}

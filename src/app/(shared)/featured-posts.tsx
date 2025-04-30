import { InnerWrap, Wrapper } from "@/lib/atoms";
import { paths } from "@/routes/paths";
import { getAllFeaturedArticlesAction } from "@/server/actions/articles";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredPosts = {
  title: "Check our inside blog & news",
  description: "",
};

type Article = {
  title: string;
  image: string;
  categories: string[];
  description: string;
  date: string;
  reading_time: string;
  slug: string;
};

export default async function FeaturedPosts() {
  const featuredArticles: Article[] = await getAllFeaturedArticlesAction();

  // Sort articles by date in descending order to get the most recent ones
  const sortedArticles = featuredArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Limit to only 3 most recent articles
  const recentArticles = sortedArticles.slice(0, 3);

  return (
    <Wrapper className="py-[5dvh] bg-slate-50">
      <InnerWrap>
        <h2 className="text-4xl font-semibold tracking-tight text-center mb-2">
          {featuredPosts.title}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {featuredPosts.description}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {recentArticles.map((article, index) => (
            <li
              key={index}
              className="flex flex-col justify-between overflow-hidden font-title bg-white rounded-lg shadow-md aspect-[3/4]"
            >
              <div className="flex flex-col relative aspect-video overflow-hidden h-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="absolute inset-0"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6 flex flex-col items-start justify-start gap-2 h-full">
                <h3 className="text-lg font-medium tracking-tight flex h-full items-start justify-start">
                  {article.title}
                </h3>
                {article.categories[0] && (
                  <p className="text-xs text-gray-400 hidden">
                    {article.categories[0]}
                  </p>
                )}
                <div className="flex flex-col text-left">
                  <p className="text-gray-600 mb-4 hidden">
                    {article.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-400 mt-auto">
                    <span>
                      {new Date(article.date).toLocaleDateString("en-GB")}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{article.reading_time}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t mt-4">
                <Link
                  href={paths.blog.slug(article.slug)}
                  className="flex w-full text-md tracking-tight text-brand-primary hover:text-brand-bg1 transition duration-300 ease-in-out border rounded-md hover:bg-gray-50 py-3 items-center justify-between px-4 group"
                >
                  <p className="ml-2"> Leer más</p>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-8 bg-brand-bg1 text-white font-semibold font-title px-6 py-2 rounded hover:bg-green-600 mx-auto  transition duration-300 ease-in-out block">
          Ver todos
        </button>
      </InnerWrap>
    </Wrapper>
  );
}

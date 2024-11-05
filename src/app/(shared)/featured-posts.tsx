import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { paths } from "@/routes/paths";
import { getAllFeaturedArticlesAction } from "@/server/actions/articles";
import Image from "next/image";
import Link from "next/link";

const featuredPosts = {
  title: "Explore Real Estate Insights",
  description: "Stay informed on Spain's real estate market trends.",
  posts: [
    {
      category: "Invest",
      title: "Top Tips for First-Time Investors",
      description:
        "Discover essential strategies for successful real estate investments in Spain.",
      author: "John Doe",
      date: "11 Jan 2022",
      readTime: "5 min read",
    },
    {
      category: "Market",
      title: "Understanding Property Valuation in Spain",
      description:
        "Learn how to accurately assess property values for investments.",
      author: "Alex Smith",
      date: "10 Feb 2022",
      readTime: "5 min read",
    },
    {
      category: "Finance",
      title: "Navigating Mortgages for Investment Properties",
      description:
        "Essential tips for securing financing for your real estate investments.",
      author: "Alex Johnson",
      date: "15 Mar 2022",
      readTime: "7 min read",
    },
  ],
};

export default async function FeaturedPosts() {
  const featuredArticles = await getAllFeaturedArticlesAction();

  return (
    <Wrapper>
      <InnerWrap>
        <h2 className="text-3xl font-bold mb-4">{featuredPosts.title}</h2>
        <p className="mb-8">{featuredPosts.description}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <li key={index} className="flex flex-col justify-between">
              <Card className="h-full flex flex-col">
                <CardHeader className="items-start justify-start text-left">
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  {article.categories[0] && (
                    <CardDescription>{article.categories[0]}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col grow px-0 py-2">
                  <div className="flex flex-col grow relative aspect-video overflow-hidden h-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="absolute inset-0"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex flex-col px-8 text-left pt-8">
                    <p className="text-gray-700 mb-4">{article.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-auto ">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.reading_time}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={paths.blog.slug(article.slug)}
                    className="flex w-full pt-2"
                  >
                    <Button className="flex w-full">Read the article</Button>
                  </Link>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
        <button className="mt-8 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
          View all
        </button>
      </InnerWrap>
    </Wrapper>
  );
}

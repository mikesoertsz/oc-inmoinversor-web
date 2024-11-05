import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { paths } from "@/routes/paths";
import { getAllArticlesAction } from "@/server/actions/articles";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const articles = await getAllArticlesAction();

  return (
    <main className="flex flex-col h-full w-full scroll-smooth">
      <Wrapper className="py-12">
        <InnerWrap className="items-start justify-center max-w-6xl">
          <h1 className="text-4xl font-bold mb-4">Blogs</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={paths.blog.slug(article.slug)}>
                <Card className="flex flex-col h-full border-none relative">
                  <CardContent className="aspect-video relative">
                    <Image
                      src={article.image}
                      alt={article.slug}
                      fill
                      className="absolute inset-0 object-fit rounded-t-xl"
                      style={{ objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardHeader className="flex-1">
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </InnerWrap>
      </Wrapper>
    </main>
  );
}

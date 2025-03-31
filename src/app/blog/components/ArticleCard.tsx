import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/routes/paths";
import Image from "next/image";
import Link from "next/link";

interface Article {
  title: string;
  slug: string;
  description: string;
  image: string;
  alt_text: string;
  featured?: boolean;
  readingTime?: string;
  reading_time?: string;
  categories?: string[];
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const primaryCategory = article.categories?.[0];

  return (
    <Link href={paths.blog.slug(article.slug)} className="group">
      <Card className="flex flex-col h-full border border-gray-100 hover:border-gray-300 hover:shadow-md transition duration-300 ease-in-out rounded-sm overflow-hidden">
        <CardContent className="aspect-video relative p-0">
          <Image
            src={article.image}
            alt={article.alt_text || article.title}
            fill
            className="absolute inset-0"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 text-[10px] px-2 py-1 rounded">
            {article.readingTime || article.reading_time || "5 mins"}
          </div>
        </CardContent>
        <CardHeader className="flex-1">
          {primaryCategory && (
            <div className="text-xs text-gray-500 mb-1">{primaryCategory}</div>
          )}
          <CardTitle className="line-clamp-2 leading-5 font-medium">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-xs text-gray-500 py-1">
            {article.description}
          </CardDescription>
          <div className="text-gray-700 text-xs mt-2 group-hover:text-black transition-colors flex items-center">
            Leer más
            <span className="ml-1 transform group-hover:translate-x-1 transition-transform delay-200">
              →
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

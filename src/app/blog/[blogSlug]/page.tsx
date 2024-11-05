import { BlogLayout } from "@/app/layouts/blog/blog-layout";
import { paths } from "@/routes/paths";
import { getArticleBySlugAction } from "@/server/actions/articles";
import { notFound } from "next/navigation";

interface BlogParams {
  params: {
    blogSlug: string;
  };
}

export async function generateMetadata({ params }: BlogParams) {
  const article = await getArticleBySlugAction(params.blogSlug);
  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: paths.base.blog(article.slug),
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function Blog({ params }: BlogParams) {
  const article = await getArticleBySlugAction(params.blogSlug);

  if (!article) {
    return notFound();
  }

  return <BlogLayout article={article} />;
}

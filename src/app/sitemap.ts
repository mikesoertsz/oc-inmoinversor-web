import { paths, ROOTS } from "@/routes/paths";
import { getAllArticlesAction } from "@/server/actions/articles";

export default async function sitemap() {
  const articles = await getAllArticlesAction();
  const formattedArticles = articles.map((article) => ({
    url: paths.base.blog(article.slug),
    lastModified: new Date(article.updated).toISOString().split("T")[0],
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${ROOTS.BASE}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...formattedArticles];
}

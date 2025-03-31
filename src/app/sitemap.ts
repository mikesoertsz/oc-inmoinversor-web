import { paths, ROOTS } from "@/routes/paths";
import { getAllArticlesAction } from "@/server/actions/articles";

export default async function sitemap() {
  const articles = await getAllArticlesAction();
  const formattedArticles = articles.map((article) => {
    // Try to create a valid date from article.updated, fallback to current date if invalid
    let lastModified;
    try {
      const date = article.updated ? new Date(article.updated) : new Date();
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        lastModified = new Date().toISOString().split("T")[0];
      } else {
        lastModified = date.toISOString().split("T")[0];
      }
    } catch {
      lastModified = new Date().toISOString().split("T")[0];
    }

    return {
      url: paths.base.blog(article.slug),
      lastModified,
    };
  });

  const routes = ["", "/blog"].map((route) => ({
    url: `${ROOTS.BASE}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...formattedArticles];
}

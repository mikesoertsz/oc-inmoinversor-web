import {
  getAllArticlesAction,
  getAllShortsArticlesAction,
} from "@/server/actions/articles";
import CtaCommunity from "../(shared)/cta-community";
import FAQ from "../(shared)/faq";
import FeaturedPosts from "../(shared)/featured-posts";
import Hero from "../(shared)/hero";
import MostRecentPost from "../(shared)/most-recent-post";
import ShortsCarousel from "./shorts";

export async function generateMetadata() {
  return {
    title: "Home",
  };
}

export default async function Home() {
  const articles = await getAllArticlesAction();
  const shorts = await getAllShortsArticlesAction();

  return (
    <main className="flex flex-col h-full w-full scroll-smooth">
      <Hero />
      <FeaturedPosts />
      <ShortsCarousel shorts={shorts} />
      <MostRecentPost articles={articles} />
      <FAQ />
      <CtaCommunity />
    </main>
  );
}

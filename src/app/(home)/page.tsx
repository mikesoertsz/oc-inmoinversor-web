import CtaCommunity from "../(shared)/cta-community";
import FAQ from "../(shared)/faq";
import FeaturedPosts from "../(shared)/featured-posts";
import Hero from "../(shared)/hero";
import MostRecentPost from "../(shared)/most-recent-post";
import ShortsCarousel from "./shorts";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full scroll-smooth">
      <Hero />
      <FeaturedPosts />
      <ShortsCarousel />
      <MostRecentPost />
      <FAQ />
      <CtaCommunity />
    </main>
  );
}

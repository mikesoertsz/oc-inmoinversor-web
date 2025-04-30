import // getAllArticlesAction,

// getAllShortsArticlesAction,
"@/server/actions/articles";
import Hero from "../(shared)/attention-hero";
import LastVideo from "../(shared)/attention-lastvideo";
import FAQ from "../(shared)/faq";
import FeaturedPosts from "../(shared)/featured-posts";
// import InfluencerBackground from "../(shared)/influencer-background";
// import MostRecentPost from "../(shared)/most-recent-post";
// import ShortsCarousel from "./shorts";

export async function generateMetadata() {
  return {
    title: "Home",
  };
}

export default async function Home() {
  // const articles = await getAllArticlesAction();
  // const shorts = await getAllShortsArticlesAction();

  return (
    <main className="flex flex-col h-full w-full scroll-smooth">
      <Hero />
      {/* <AppleCarousel /> */}
      <LastVideo />
      <FeaturedPosts />
      {/* <MostRecentPost articles={articles} /> */}
      <FAQ />
      {/* <CtaCommunity /> */}
    </main>
  );
}

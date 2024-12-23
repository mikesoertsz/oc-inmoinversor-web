import // getAllArticlesAction,

  // getAllShortsArticlesAction,
  "@/server/actions/articles";
import Hero from "../(shared)/attention-hero";
import LastVideo from "../(shared)/attention-lastvideo";
import CtaCommunity from "../(shared)/cta-community";
import FAQ from "../(shared)/faq";
import AppleCarousel from "../(shared)/apple-carousel";
import SwiperCarousel from "../(shared)/swiper-carouse";
// import MostRecentPost from "../(shared)/most-recent-post";
// import ShortsCarousel from "./shorts";

const defaultSlides = [
  {
    title: "One Tap Setup",
    description: "Easily set up your device with a single tap.",
    url: "https://www.youtube.com/watch?v=h34shkm9xJ8",
    type: "youtube",
    img: "/img/episode/slug-title.jpeg",
    imageWidth: 343,
    imageHeight: 375,
  },
  {
    title: "Personalized Spatial Audio",
    description: "Experience audio tailored just for you.",
    url: "https://www.youtube.com/watch?v=z1ZhSrPrbWY",
    type: "youtube",
    img: "/slide-img/spatial-audio.jpeg",
    imageWidth: 211,
    imageHeight: 375,
  },
  {
    title: "Audio Sharing",
    description: "Share your audio with friends effortlessly.",
    url: "https://www.youtube.com/watch?v=7UvPN9VE9jY",
    type: "youtube",
    img: "/slide-img/audio-sharing.jpeg",
    imageWidth: 265,
    imageHeight: 352,
    centered: true,
  },
  {
    title: "Automatic Switching",
    description: "Seamlessly switch between devices.",
    url: "https://www.youtube.com/watch?v=XSa2mRzyW2c",
    type: "youtube",
    img: "/slide-img/automatic-switching.jpeg",
    imageWidth: 336,
    imageHeight: 100,
    centered: true,
  },
  {
    title: "Siri",
    description: "Use Siri to control your devices hands-free.",
    url: "https://www.youtube.com/watch?v=XSa2mRzyW2c",
    type: "youtube",
    img: "/slide-img/siri.jpeg",
    imageWidth: 168,
    imageHeight: 168,
    centered: true,
  },
  {
    title: "Accessibility",
    description: "Features designed for everyone.",
    url: "https://www.youtube.com/watch?v=XSa2mRzyW2c",
    type: "youtube",
    img: "/slide-img/a11y.jpeg",
    imageWidth: 135,
    imageHeight: 135,
    centered: true,
  },
];

const breakpoints = {
  480: { slidesPerView: 1.5 },
  780: { slidesPerView: 2.03 },
  990: { slidesPerView: 3.1 },
  1380: { slidesPerView: 3.2 },
};

const navigationClasses = {
  next: "custom-next",
  prev: "custom-prev",
};
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
      <SwiperCarousel
        slides={defaultSlides}
        breakpoints={breakpoints}
        navigationClasses={navigationClasses}
      />
      <LastVideo />
      {/* <FeaturedPosts /> */}
      {/* <ShortsCarousel shorts={shorts} /> */}
      {/* <MostRecentPost articles={articles} /> */}
      <FAQ />
      <CtaCommunity />
    </main>
  );
}

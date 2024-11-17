import { InnerWrap, Wrapper } from "@/lib/atoms";
import AttentionCoursePreview from "./attention-coursepreview";

const heroContent = {
  title: "Real Estate Investment Masterclass",
  description:
    "Join our comprehensive course to learn the latest strategies in real estate investment and build a successful property portfolio.",
};

export default function AttentionHero() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[8dvh]">
      <InnerWrap className="items-center justify-center text-center text-white max-w-4xl">
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          {heroContent.title}
        </h1>
        <p className="mb-8 text-lg max-w-prose">{heroContent.description}</p>
        <a
          href="#register"
          className="bg-white text-black px-8 py-3 rounded-md mb-4 hover:bg-gray-200 mt-12"
        >
          Get Instant Access
        </a>
        <p className="text-sm">
          Limited-time offer, the prices will increase soon.
        </p>
        <AttentionCoursePreview />
      </InnerWrap>
    </Wrapper>
  );
}

import { InnerWrap, Wrapper } from "@/lib/atoms";

type CTAContent = {
  preheading: string;
  heading: string;
  subheading: string;
  name: string;
  quote: string;
};

const defaultCTAContent: CTAContent = {
  preheading: "Join Us Now",
  heading: "Unlock Your Potential Today!",
  subheading: "Limited spots available. Act fast!",
  name: "Jane Doe",
  quote: "This course changed my life!",
};

type DesireCTAFinalProps = {
  ctaContent?: CTAContent;
};

export default function DesireCTAFinal({
  ctaContent = defaultCTAContent,
}: DesireCTAFinalProps) {
  return (
    <Wrapper className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
      <InnerWrap className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          {ctaContent.preheading}
        </h3>
        <h2 className="text-3xl font-bold text-white mb-4">
          {ctaContent.heading}
        </h2>
        <p className="text-lg text-white mb-6">{ctaContent.subheading}</p>
        <button className="mt-6 bg-yellow-500 text-black px-8 py-3 text-lg rounded-lg hover:bg-yellow-600 transition">
          Enroll Now
        </button>
        <p className="mt-4 text-xs text-white">
          100% satisfaction guaranteed or your money back.
        </p>
      </InnerWrap>
    </Wrapper>
  );
}

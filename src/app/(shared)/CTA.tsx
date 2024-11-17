import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import Link from "next/link";
import { BiLogoZoom } from "react-icons/bi";

export default function CTA() {
  const ctaContent = {
    preheading: "Ready to get started?",
    heading: "Let's talk about your project.",
    body: "Get in touch today. Let's build something great together.",
  };
  return (
    <Wrapper className="text-gray-200 bg-brand-base-f">
      <InnerWrap>
        <div className="flex flex-col items-center justify-center py-[10vh] text-center">
          <TitleBlock
            preheading={ctaContent.preheading}
            heading={ctaContent.heading}
            body={ctaContent.body}
            theme="dark"
            orientation="center"
          />
          <div className="flex gap-4 mt-4">
            <Link
              className="flex items-center justify-center gap-2 px-12 py-4 mt-8 font-medium text-black transition duration-200 ease-in-out bg-yellow-300 rounded-lg shadow-none text-md hover:bg-white hover:text-black font-body"
              href="https://cal.com/startupmike/discovery-call"
            >
              <BiLogoZoom size={25} />
              Book a consultation
            </Link>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

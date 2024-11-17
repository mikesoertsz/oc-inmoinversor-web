import { Desire } from "@/lib/types";
import tw from "tailwind-styled-components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Body, InnerWrap, Wrapper } from "@/lib/atoms";

const FAQWrap = tw.div`flex flex-col md:flex-row gap-12 w-full`;
const Left = tw.div`md:w-2/5 flex rounded-xl overflow-hidden items-start justify-start h-full flex-col pt-8 text-white`;
const Right = tw.div`md:w-3/5 flex rounded-xl overflow-clip h-full text-gray-200`;

export default function Faq({ faq }: Desire) {
  return (
    <Wrapper id="faq" className="bg-brand-base-f">
      <InnerWrap className="py-[5vh]">
        <FAQWrap>
          <Left>
            <h2 className="text-4xl font-semibold tracking-tight font-title">
              Common Questions
            </h2>
            <Body className="mt-4">
              Have another question?
              <a
                href="https://calendly.com/startupmike/discovery"
                target="_blank"
                className="pl-2 transition duration-200 ease-in-out text-brand-base-a hover:text-white"
              >
                Book a call.
              </a>
            </Body>
          </Left>
          <Right>
            <Accordion type="single" collapsible className="w-full mt-4">
              {faq.questions.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.value}
                  className="border-0"
                >
                  <AccordionTrigger className="font-medium tracking-tight text-left border-0 text-md md:text-lg font-body hover:text-brand-base-a text-brand-base-g">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 tracking-tight border-0 text-md md:text-lg max-w-prose font-body">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Right>
        </FAQWrap>
      </InnerWrap>
    </Wrapper>
  );
}

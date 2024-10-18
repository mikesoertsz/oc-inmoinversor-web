import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InnerWrap, Wrapper } from "@/lib/atoms";

const faqContent = {
  title: "FAQs",
  description:
    "Explore answers to common questions about real estate investment in Spain to guide your journey.",
  questions: [
    {
      id: "item-1",
      question: "What topics are covered on the YouTube channel?",
      answer:
        "Our YouTube channel covers a wide range of topics including market analysis, investment strategies, property management tips, and interviews with real estate experts in Spain.",
    },
    {
      id: "item-2",
      question: "How can I start investing in real estate in Spain?",
      answer:
        "To start investing in real estate in Spain, watch our beginner's guide series on YouTube. It covers everything from understanding the market to finding the right property and securing financing.",
    },
    {
      id: "item-3",
      question: "What are the benefits of subscribing to the channel?",
      answer:
        "By subscribing to our channel, you'll get access to the latest videos on real estate trends, investment opportunities, and expert advice. Stay informed and make better investment decisions.",
    },
    {
      id: "item-4",
      question: "Can I get personalized advice through the channel?",
      answer:
        "While our videos provide general advice, you can reach out to us for personalized consultations. We also host live Q&A sessions where you can ask specific questions about your investment plans.",
    },
    {
      id: "item-5",
      question: "How often is new content uploaded?",
      answer:
        "We upload new content weekly, including market updates, investment tips, and interviews with industry professionals. Make sure to subscribe and hit the notification bell to stay updated.",
    },
  ],
  footer: {
    message: "Still have questions?",
    contact: "Reach out for personalized advice and support.",
    buttonText: "Contact",
  },
};

export default function FAQ() {
  return (
    <Wrapper>
      <InnerWrap>
        <div className="flex w-full flex-col item-center justify-center max-w-3xl py-[5dvh]">
          <h2 className="text-3xl font-bold mb-4">{faqContent.title}</h2>
          <p className="mb-8">{faqContent.description}</p>
          <Accordion type="single" collapsible>
            {faqContent.questions.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="text-left"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 flex items-center justify-center flex-col">
            <h3 className="text-xl font-semibold">
              {faqContent.footer.message}
            </h3>
            <p className="mb-4">{faqContent.footer.contact}</p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
              {faqContent.footer.buttonText}
            </button>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}

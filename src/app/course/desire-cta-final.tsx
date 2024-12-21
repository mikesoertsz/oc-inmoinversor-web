"use client";
import React from "react";
import { InnerWrap, PreHeading, Wrapper } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { GoCheck } from "react-icons/go";

type CTAContent = {
  preheading: string;
  heading: string;
  subheading: string;
  name: string;
  quote: string;
};

const defaultCTAContent: CTAContent = {
  preheading: "Únete a Nosotros Ahora",
  heading: "¡Desbloquea Tu Potencial Hoy!",
  subheading: "Plazas limitadas disponibles. ¡Actúa rápido!",
  name: "Jane Doe",
  quote: "¡Este curso cambió mi vida!",
};

type DesireCTAFinalProps = {
  ctaContent?: CTAContent;
};

export default function DesireCTAFinal({
  ctaContent = defaultCTAContent,
}: DesireCTAFinalProps) {
  const pricingTiers = [
    {
      title: "Online Access",
      price: 899,
      features: ["Access to all course content online", "Community support"],
    },
    {
      title: "Full Access",
      price: 2999,
      features: [
        "Access to all course content online",
        "Community support",
        "One-on-one mentorship",
        "Exclusive webinars",
      ],
    },
  ];

  return (
    <Wrapper className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
      <InnerWrap className="text-center">
        <PreHeading>{ctaContent.preheading}</PreHeading>
        <h2 className="text-3xl font-bold text-white mb-4 mt-5">
          {ctaContent.heading}
        </h2>
        <p className="text-lg text-white mb-6">{ctaContent.subheading}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
          {pricingTiers.map((tier, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-start justify-start h-full flex-col"
            >
              <div className="flex flex-col items-start justify-start px-4">
                <h3 className="text-xl font-bold mb-2">{tier.title}</h3>
                <p className="text-4xl font-medium mb-4 font-body tracking-tighter">
                  €{tier.price.toLocaleString("de-DE")}
                </p>
              </div>
              <ul className="text-left gap-1 py-4 px-4 flex h-full flex-col justify-start items-start">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs">
                    <GoCheck className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="bg-yellow-400 shadow-none text-black px-4 py-4 rounded-lg hover:bg-yellow-300 transition flex items-center justify-center w-full">
                Choose {tier.title}
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-white">
          100% de satisfacción garantizada o te devolvemos tu dinero.
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
